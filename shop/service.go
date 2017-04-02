package lemonsshop

import (
	"github.com/ggerrietts/lemons/auth"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"gopkg.in/gin-gonic/gin.v1"
)

func send_error(c *gin.Context, code int, message string) {
	c.JSON(code, gin.H{
		"code":    code,
		"message": message,
	})
	c.Abort()
}

type LemonsShopService struct {
	Db     *sqlx.DB
	Secret string
}

func (svc *LemonsShopService) RegisterServiceHandlers(r *gin.Engine) {
	protected := r.Group("/v1/", lemonsauth.AuthMiddleware(svc.Secret))
	protected.GET("/shop", getShop(svc.Db))
	protected.POST("/shop", postShop(svc.Db))
}
