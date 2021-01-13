package server

import (
	"strconv"

	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

// LoadConfig sets up the configuration
func LoadConfig() {
	setDefaults()
	viper.AutomaticEnv()
	logrus.SetLevel(logrus.Level(viper.GetInt("LOG_LEVEL")))
	logrus.SetReportCaller(true)
}

// setDefaults is the place to create new config values
func setDefaults() {
	viper.SetDefault("DB_DSN", "root:branch@tcp(localhost)/lemons")
	viper.SetDefault("LOG_LEVEL", strconv.Itoa(int(logrus.DebugLevel)))
	viper.SetDefault("LISTEN_PORT", ":4242")
}
