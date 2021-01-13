package game

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// DummyDice implements Dicer as a mock
type DummyDice struct {
	DeltaList []int64
	Delta     int
}

func NewDummyDice(deltas []int64) *DummyDice {
	return &DummyDice{
		DeltaList: deltas,
	}
}

func (dd *DummyDice) NormalRandomAdjustment(basis, stdev int64) int64 {
	if dd.DeltaList == nil {
		return basis
	}
	delta := dd.DeltaList[dd.Delta]
	dd.Delta++
	if dd.Delta >= len(dd.DeltaList) {
		dd.Delta = 0
	}
	return basis + delta
}

type CalculationTest struct {
	Deltas   []int64
	Given    Storefront
	Expected Storefront
}

var WeatherTests = []CalculationTest{
	{
		Deltas: []int64{1, 2, 3, 4},
		Given: Storefront{
			ForecastPrecipitation: 50,
			ForecastTemperature:   50,
		},
		Expected: Storefront{
			CurrentPrecipitation:  51,
			CurrentTemperature:    52,
			ForecastPrecipitation: 54,
			ForecastTemperature:   56,
		},
	}, {
		Deltas: []int64{-1},
		Given: Storefront{
			ForecastPrecipitation: 50,
			ForecastTemperature:   50,
		},
		Expected: Storefront{
			CurrentPrecipitation:  49,
			CurrentTemperature:    49,
			ForecastPrecipitation: 48,
			ForecastTemperature:   48,
		},
	},
}

func TestStorefront_nextWeather(t *testing.T) {
	for _, test := range WeatherTests {
		dd := NewDummyDice(test.Deltas)
		given := test.Given
		got := given.nextWeather(dd)
		assert.Equal(t, &test.Expected, got)
	}
}

var PurchaseTests = []CalculationTest{
	{
		Given: Storefront{
			Purchasing: 10,
			Cash:       20_00,
			Backstock:  0,
		},
		Expected: Storefront{
			Purchasing: 10,
			Cash:       12_50,
			Backstock:  10,
		},
	}, {
		Given: Storefront{
			Purchasing: 20,
			Cash:       7_75,
			Backstock:  10,
		},
		Expected: Storefront{
			Purchasing: 10,
			Cash:       25,
			Backstock:  20,
		},
	},
}

func TestStorefront_nextPurchase(t *testing.T) {
	for _, test := range PurchaseTests {
		given := test.Given
		got := given.nextPurchase()
		assert.Equal(t, &test.Expected, got)
	}
}

var PreparationTests = []CalculationTest{
	{
		Given: Storefront{
			Backstock: 100,
			Preparing: 10,
			Prepared:  5,
		},
		Expected: Storefront{
			Backstock: 90,
			Preparing: 10,
			Prepared:  10,
		},
	}, {
		Given: Storefront{
			Backstock: 5,
			Preparing: 10,
			Prepared:  15,
		},
		Expected: Storefront{
			Backstock: 0,
			Preparing: 5,
			Prepared:  5,
		},
	},
}

func TestStorefront_nextPreparation(t *testing.T) {
	for _, test := range PreparationTests {
		given := test.Given
		got := given.nextPreparation()
		assert.Equal(t, &test.Expected, got)
	}
}

var SalesTests = []CalculationTest{
	{
		Deltas: nil,
		Given: Storefront{
			CurrentPrecipitation: 100,
			CurrentTemperature:   100,
			Demand:               0,
			Prepared:             10,
			Cash:                 0,
			Price:                1_00,
		},
		Expected: Storefront{
			CurrentPrecipitation: 100,
			CurrentTemperature:   100,
			Demand:               10,
			Prepared:             0,
			Cash:                 10_00,
			Price:                1_00,
		},
	}, {
		Deltas: nil,
		Given: Storefront{
			CurrentPrecipitation: 100,
			CurrentTemperature:   100,
			Demand:               0,
			Prepared:             5,
			Cash:                 0,
			Price:                1_00,
		},
		Expected: Storefront{
			CurrentPrecipitation: 100,
			CurrentTemperature:   100,
			Demand:               10,
			Prepared:             0,
			Cash:                 5_00,
			Price:                1_00,
		},
	}, {
		Deltas: nil,
		Given: Storefront{
			CurrentPrecipitation: 100,
			CurrentTemperature:   100,
			Demand:               0,
			Prepared:             5,
			Cash:                 10_00,
			Price:                1_00,
		},
		Expected: Storefront{
			CurrentPrecipitation: 100,
			CurrentTemperature:   100,
			Demand:               10,
			Prepared:             0,
			Cash:                 15_00,
			Price:                1_00,
		},
	},
}

func TestStorefront_nextSales(t *testing.T) {
	for _, test := range SalesTests {
		dd := NewDummyDice(test.Deltas)
		given := test.Given
		got := given.nextSales(dd)
		assert.Equal(t, &test.Expected, got)
	}
}
