package main

import (
	"gopkg.in/gin-gonic/gin.v1"

	"github.com/ggerrietts/lemons/auth"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"os"
)

type LemonsConfig struct {
	DbDSN  string
	Listen string
	Secret string
}

func GetConfig() LemonsConfig {
	var config = LemonsConfig{}
	config.DbDSN = os.Getenv("DB_DSN")
	if config.DbDSN == "" {
		config.DbDSN = "root:root@tcp(mysql)"
	}
	config.Listen = os.Getenv("LISTEN")
	if config.Listen == "" {
		config.Listen = ":4242"
	}
	config.Secret = os.Getenv("AUTH_SECRET")
	if config.Secret == "" {
		config.Secret = "SILENTLYDANCEWITHDORMOUSEARGENTINA"
	}
	return config
}

func main() {
	cfg := GetConfig()
	db, err := sqlx.Connect("mysql", cfg.DbDSN)
	if err != nil {
		panic("o noes the databases")
	}
	svc := lemonsauth.LemonsAuthenticationService{
		Secret: cfg.Secret,
		Db:     db,
	}

	r := gin.Default()
	svc.RegisterServiceHandlers(r)

	r.Run(cfg.Listen)

}
