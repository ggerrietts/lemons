package lemonsauth

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"gopkg.in/guregu/null.v3"
	"strings"
	"time"
)

type Persist struct {
	ID        int64     `json:"id,omitempty"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}

// List of possible ingredients.
type Ingredient struct {
	Name       string  `json:"name"`
	Unit       string  `json:"unit"`
	QtyPerUnit float64 `db:"qty_per_unit" json:"qty_per_unit"`
}

var IngredientHash map[string]Ingredient = {
	"Lemons": Ingredient{
		Name: "Lemons",
		Unit: "lbs",
		QtyPerUnit: 2.0,
	},
	"Sugar": Ingredient{
		Name: "Sugar",
		Unit: "lbs",
		QtyPerUnit: 1.0,
	},
	"Water": Ingredient{
		Name: "Water",
		Unit: "gal",
		QtyPerUnit: 1.0,
	},
	"Ice": Ingredient{
		Name: "Ice",
		Unit: "lbs",
		QtyPerUnit: 1.0,
	},
}


type SupplyItem struct {
	Ingredient string `db:"ingredient" json:"ingredient"`
	Quantity   float64
}

type PriceItem struct {
	Ingredient string `db:"ingredient" json:"ingredient"`
	Price      float64
}

var Prices map[string]PriceItem = {
	"Lemons": PriceItem{
		Ingredient: "Lemons",
		Price: 
// shop
type Shop struct {
	Persist
	UserID   int64 `db:"user_id" json:"user_id"`
	Servings int64
	Cash     float64
}

func GetShopByUser(db *sqlx.DB, uid int64) (Shop, error) {
	var s Shop
	err := db.Get(&s, "SELECT * from shop where user_id = ?", uid)
	if err != nil {
		return Shop{}, err
	}
	return s, nil
}

func (s *Shop) Create(db *sqlx.DB) error {
	stmt := "INSERT INTO shops "
	stmt += "(user_id, servings, cash, updated_at, created_at) "
	stmt += "VALUES (:user_id, :servings, :cash, NOW(), NOW())"
	result, err := db.NamedExec(stmt, s)
	if err != nil {
		return err
	}
	id, res_err := result.LastInsertId()
	if res_err == nil {
		s.ID = id
	}
	return res_err
}

func (s *Shop) Update(db *sqlx.DB) error {
	stmt := "UPDATE shops SET "
	stmt += "user_id = :user_id, "
	stmt += "servings = :servings, "
	stmt += "cash = :cash, "
	stmt += "updated_at = NOW() "
	stmt += "WHERE id = :id"
	_, err := db.NamedExec(stmt, s)
	return err
}

// inventory
type Inventory struct {
	Persist
	ShopID int64 `db:"shop_id" json:"shop_id"`
	SupplyItem
}

func GetInventoriesByShop(db *sqlx.DB, shop_id int64) ([]Inventory, error) {
	ii := []Inventory{}
	err := db.Select(&ii, "SELECT * from inventories where shop_id = ?", shop_id)
	if err != nil {
		return []Inventory{}, err
	}
	return ii, nil
}

func (i *Inventory) Create(db *sqlx.DB) error {
	stmt := "INSERT INTO inventories "
	stmt += "(shop_id, ingredient, quantity, updated_at, created_at) "
	stmt += "VALUES (:shop_id, :ingredient, :quantity, NOW(), NOW())"
	result, err := db.NamedExec(stmt, i)
	if err != nil {
		return err
	}
	id, res_err := result.LastInsertId()
	if res_err == nil {
		i.ID = id
	}
	return res_err
}

func (i *Inventory) Update(db *sqlx.DB) error {
	stmt := "UPDATE inventories SET "
	stmt += "shop_id = :shop_id, "
	stmt += "ingredient = :ingredient, "
	stmt += "quantity = :quantity, "
	stmt += "updated_at = NOW() "
	stmt += "WHERE id = :id"
	_, err := db.NamedExec(stmt, i)
	return err
}

type ShopWithInventory struct {
	Shop
	Inventories []Inventory
}
