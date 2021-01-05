package server

import (
	"strconv"

	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

func LoadConfig() {
	setDefaults()
	viper.AutomaticEnv()
	logrus.SetLevel(logrus.Level(viper.GetInt("LOG_LEVEL")))
	logrus.SetReportCaller(true)
}

func setDefaults() {
	viper.SetDefault("DB_DSN", "root:root@tcp(localhost)")
	viper.SetDefault("LOG_LEVEL", strconv.Itoa(int(logrus.DebugLevel)))
	viper.SetDefault("LISTEN_PORT", ":4242")
}
