package server

import (
	"fmt"

	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

func BootBanner() {
	logrus.Info("--[ L | E | M | O | N | S ] ---------->")
	logrus.Info(fmt.Sprintf("    LISTEN_PORT: %s", viper.GetString("LISTEN_PORT")))
	logrus.Info(fmt.Sprintf("    DB_DSN:      %s", viper.GetString("DB_DSN")))
	logrus.Info(fmt.Sprintf("    LOG_LEVEL:   %s", viper.GetString("LOG_LEVEL")))
	logrus.Info("-------------------------------------->")
}

func main() {
	LoadConfig()
	BootBanner()
}
