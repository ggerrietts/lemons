package main

import (
	"gopkg.in/gin-gonic/gin.v1"

	"github.com/ggerrietts/lemons/auth"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type LemonsConfig struct {
	DbDSN  string
	Listen string
	Secret string
}

func GetConfig() LemonsConfig {
	var config = LemonsConfig{}
	s.DbDSN = os.Getenv("DB_DSN")
	if s.DbDSN == "" {
		s.DbDSN = "root:root@tcp(mysql)"
	}
	s.Listen = os.Getenv("LISTEN")
	if s.Listen == "" {
		s.Listen = ":4242"
	}
	s.Secret = os.Getenv("AUTH_SECRET")
	if s.Secret == "" {
		s.Secret = "SILENTLYDANCEWITHDORMOUSEARGENTINA"
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
		Secret: s.Secret,
		Db:     db,
	}

	r := gin.Default()
	lemonsauth.RegisterAuthHandlers(r, svc)
	lemonsauth.RegisterServiceHandlers(r, svc)

	r.Run(cfg.Listen)

}
