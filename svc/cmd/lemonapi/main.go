package main

import (
	"gopkg.in/gin-gonic/gin.v1"

	"github.com/ggerrietts/lemons/svc/auth"
	"github.com/ggerrietts/lemons/svc/util"
)

func main() {
	cfg := lemonutils.GetConfig()
	_, err := lemonutils.GetDb()
	if err != nil {
		panic("o noes the databases")
	}
	r := gin.Default()
	lemonauth.RegisterAuthHandlers(r)
	lemonauth.RegisterServiceHandlers(r)

	r.Run(cfg.Listen)

}
