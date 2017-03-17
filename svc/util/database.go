package lemonutils

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var db *sqlx.DB

func GetDb() (*sqlx.DB, error) {
	if db != nil {
		return db, nil
	}
	cfg := GetConfig()
	return sqlx.Connect("mysql", cfg.DbDSN)
}
