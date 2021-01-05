package main

import (
	_ "github.com/go-sql-driver/mysql"

	"github.com/ggerrietts/lemons/pkg/server"
)

func main() {
	server.LoadConfig()
	server.BootBanner()
}
