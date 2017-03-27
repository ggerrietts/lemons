package lemonsauth

import (
	"gopkg.in/gin-gonic/gin.v1"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type LemonsAuthenticationService struct {
	Secret string
	Db     *sqlx.DB
}

func (svc *LemonsAuthenticationService) RegisterServiceHandlers(r *gin.Engine) {

	protected := r.Group("/v1/", AuthMiddleware())
	protected.GET("/user/:id", getUser(svc.Db))
	// protected.PUT("/user/:id", putUser)
	// protected.PATCH("/user/:id", patchUser)
	// protected.DELETE("/user/:id", deleteUser)

	unprotected := r.Group("/v1/")
	unprotected.POST("/user", postUser(svc.Db))
}
