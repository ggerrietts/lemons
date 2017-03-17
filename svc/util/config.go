package lemonutils

import (
	"os"
)

type Configuration struct {
	DbDSN  string
	Listen string
	Secret string
}

func GetConfig() Configuration {
	var config = Configuration{}
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
