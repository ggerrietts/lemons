package server

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"

	"github.com/ggerrietts/lemons/pkg/game"
)

// BootBanner prints a banner with some config details at startup
func BootBanner() {
	logrus.Info(">>>--[ L | E | M | O | N | S ] ---------->")
	logrus.Info(fmt.Sprintf("    LISTEN_PORT: %s", viper.GetString("LISTEN_PORT")))
	logrus.Info(fmt.Sprintf("    DB_DSN:      %s", viper.GetString("DB_DSN")))
	logrus.Info(fmt.Sprintf("    LOG_LEVEL:   %s", viper.GetString("LOG_LEVEL")))
	logrus.Info(">>>-------------------------------------->")
}

// LoadRoutes returns a configured chi.Router
func LoadRoutes() chi.Router {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Post("/api/dashboard", http.HandlerFunc(game.DashboardRequestHandler))
	r.Post("/api/turn", http.HandlerFunc(game.TurnRequestHandler))
	return r
}

// StartServer starts the server
func StartServer(r chi.Router) {
	logrus.Debug("Logging this now")
	http.ListenAndServe(viper.GetString("LISTEN_PORT"), r)
}
