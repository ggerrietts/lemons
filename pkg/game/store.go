package game

import (
	"context"
	"math"
	"math/rand"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

// Storefront is the core game object that records status from turn to turn
type Storefront struct {
	// status
	UserID    string `json:"user_id" db:"user_id"`
	Turn      int64  `json:"turn" db:"turn"`
	Backstock int64  `json:"backstock" db:"backstock"`
	Cash      int64  `json:"cash" db:"cash"`

	// weather
	CurrentTemperature    int64 `json:"cur_temp" db:"cur_temp"`
	ForecastTemperature   int64 `json:"for_temp" db:"for_temp"`
	CurrentPrecipitation  int64 `json:"cur_prec" db:"cur_prec"`
	ForecastPrecipitation int64 `json:"for_prec" db:"for_prec"`

	// turn summary
	Purchased int64 `json:"purchased" db:"purchased"`
	Prepared  int64 `json:"prepared" db:"prepared"`
	Sales     int64 `json:"sales" db:"sales"`
	Demand    int64 `json:"demand" db:"demand"`
	Waste     int64 `json:"waste" db:"waste"`

	// submitted values
	Preparing  int64 `json:"preparing" db:"preparing"`
	Purchasing int64 `json:"purchasing" db:"purchasing"`
	Price      int64 `json:"price" db:"price"`
}

const (
	loadQuery = "SELECT * from storefront where user_id=?"
	saveQuery = `INSERT INTO storefront 
		(user_id, turn, backstock, cash, cur_temp, for_temp, cur_prec, for_prec, purchased, prepared, sales, demand, waste, preparing, purchasing, price) 
	VALUES
		(:user_id, :turn, :backstock, :cash, :cur_temp, :for_temp, :cur_prec, :for_prec, :purchased, :prepared, :sales, :demand, :waste, :preparing, :purchasing, :price) 
	ON DUPLICATE KEY UPDATE 
		turn=:turn, backstock=:backstock, cash=:cash, cur_temp=:cur_temp, for_temp=:for_temp, cur_prec=:cur_prec, for_prec=:for_prec, purchased=:purchased, prepared=:prepared, sales=:sales, demand=:demand, waste=:waste, preparing=:preparing, purchasing=:purchasing, price=:price`
)

// NewStorefront creates a storefront for the supplied userID and populates it with defaults
func NewStorefront(userID string) *Storefront {
	return &Storefront{
		UserID:                userID,
		Cash:                  100_00,
		Price:                 1_00,
		Backstock:             100,
		CurrentTemperature:    70,
		CurrentPrecipitation:  70,
		ForecastTemperature:   75,
		ForecastPrecipitation: 75,
	}
}

// LoadStorefront loads up a storefront from the database
func LoadStorefront(ctx context.Context, userID string) (*Storefront, error) {
	st := Storefront{}
	db, err := connect(ctx)
	if err != nil {
		logrus.WithError(err).Error("MySQL connect")
		return nil, err
	}
	err = db.GetContext(ctx, &st, loadQuery, userID)
	return &st, err
}

// ProcessTurn is the meat of the game. It advances one turn.
func (s *Storefront) ProcessTurn(purchasing, preparing, price int64) *Storefront {
	ns := s
	ns.Purchasing = purchasing
	ns.Preparing = preparing
	ns.Price = price
	d := NewDice()
	ns = ns.nextPurchase()
	ns = ns.nextWeather(d)
	ns = ns.nextPreparation()
	ns = ns.nextSales(d)
	ns.Turn++
	return ns
}

// Save stores a storefront in the database
func (s *Storefront) Save(ctx context.Context) error {
	db, err := connect(ctx)
	if err != nil {
		return err
	}
	_, err = db.NamedExecContext(ctx, saveQuery, &s)
	if err != nil {
		logrus.WithError(err).Error("saving record")
	}
	return err
}

// nextWeather calculates the weather & forecast
func (s *Storefront) nextWeather(d Dicer) *Storefront {
	ns := *s
	ns.CurrentPrecipitation = d.NormalRandomAdjustment(s.ForecastPrecipitation, 1)
	ns.CurrentTemperature = d.NormalRandomAdjustment(s.ForecastTemperature, 1)
	ns.ForecastPrecipitation = d.NormalRandomAdjustment(ns.CurrentPrecipitation, 10)
	ns.ForecastTemperature = d.NormalRandomAdjustment(ns.CurrentTemperature, 7)
	logrus.WithFields(logrus.Fields{
		"CurrentPrecipitation":  ns.CurrentPrecipitation,
		"CurrentTemperature":    ns.CurrentTemperature,
		"ForecastPrecipitation": ns.ForecastPrecipitation,
		"ForecastTemperature":   ns.ForecastTemperature,
	}).Debug("weather complete")
	return &ns
}

// nextPurchase handles the acquisition of backstock
func (s *Storefront) nextPurchase() *Storefront {
	ns := *s
	purchasing := ns.Purchasing
	if ns.Purchasing*75 > ns.Cash {
		purchasing = ns.Cash / 75
	}
	spent := purchasing * 75
	ns.Purchasing = purchasing
	ns.Backstock += purchasing
	ns.Cash -= spent
	return &ns
}

// nextPreparation calculates the preparation of the next batch
func (s *Storefront) nextPreparation() *Storefront {
	ns := *s
	prepare := ns.Preparing
	if prepare > ns.Backstock {
		prepare = ns.Backstock
	}
	ns.Backstock = ns.Backstock - prepare
	ns.Prepared = prepare
	ns.Preparing = prepare
	logrus.WithFields(logrus.Fields{
		"Backstock": ns.Backstock,
		"Prepared":  ns.Prepared,
	}).Debug("preparation complete")
	return &ns
}

// nextSales processes the sales for the turn
func (s *Storefront) nextSales(d Dicer) *Storefront {
	basis := d.NormalRandomAdjustment(10, 3)
	prec := float64(s.CurrentPrecipitation) / 100.0
	temp := float64(s.CurrentTemperature) / 100.0
	demand := math.Round(float64(basis) * prec * temp)
	sales := int64(math.Min(demand, float64(s.Prepared)))
	ns := *s
	ns.Demand = int64(demand)
	ns.Sales = sales
	ns.Waste = ns.Prepared - sales
	ns.Cash = ns.Cash + sales*ns.Price
	logrus.WithFields(logrus.Fields{
		"Cash":   ns.Cash,
		"Demand": ns.Demand,
	}).Debug("sales complete")
	return &ns
}

// connect is a utility that grabs a connection from the pool
func connect(ctx context.Context) (*sqlx.DB, error) {
	db, err := sqlx.ConnectContext(ctx, "mysql", viper.GetString("DB_DSN"))
	if err != nil {
		logrus.WithError(err).Error("MySQL connect")
		return nil, err
	}
	return db, nil
}

type Dicer interface {
	NormalRandomAdjustment(basis, stdev int64) int64
}

// Dice permits us to inject random
type Dice struct {
	NormFloat64 func() float64
}

func NewDice() *Dice {
	rand.Seed(time.Now().Unix())
	d := Dice{
		NormFloat64: rand.NormFloat64,
	}
	return &d
}

func (d *Dice) NormalRandomAdjustment(basis, stdev int64) int64 {
	delta := math.Min(d.NormFloat64()*float64(stdev), float64(10*stdev))
	final := float64(basis) + delta
	return int64(math.Min(math.Max(final, 0.0), 100.0))
}
