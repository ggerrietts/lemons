package main

import (
	"gopkg.in/gin-gonic/gin.v1"

	"github.com/ggerrietts/lemons/svc/auth"
	"github.com/ggerrietts/lemons/svc/util"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"log"
)

type LemonsService struct {
	DbDSN  string
	Listen string
	Secret string
	Db     *sqlx.DB
}

func (s *LemonsService) GinDebug(v ...interface{}) {
	if gin.IsDebugging() {
		log.Println(v...)
	}
}
func (s *LemonsService) GetConfig() {
	var config = Configuration{}
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
	var svc LemonsService
	svc.GetConfig()
	db, err := sqlx.Connect("mysql", cfg.DbDSN)
	if err != nil {
		panic("o noes the databases")
	}
	svc.Db = db

	r := gin.Default()
	lemonsauth.RegisterAuthHandlers(r)
	lemonsauth.RegisterServiceHandlers(r)

	r.Run(cfg.Listen)

}
