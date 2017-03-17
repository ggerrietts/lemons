package lemonutils

import (
	"gopkg.in/gin-gonic/gin.v1"
	"log"
)

func GinDebug(v ...interface{}) {
	if gin.IsDebugging() {
		log.Println(v...)
	}
}
