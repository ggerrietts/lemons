package lemonsauth

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"gopkg.in/gin-gonic/gin.v1"
)

type LemonsAuthenticationService struct {
	Secret string
	Db     *sqlx.DB
}

func (svc *LemonsAuthenticationService) RegisterServiceHandlers(r *gin.Engine) {

	protected := r.Group("/v1/", AuthMiddleware(svc.Secret))
	protected.GET("/user/:id", getUser(svc.Db))
	// protected.PUT("/user/:id", putUser)
	// protected.PATCH("/user/:id", patchUser)
	// protected.DELETE("/user/:id", deleteUser)
	protected.GET("/logout", getLogout(svc.Db))
	protected.GET("/login", getLogin(svc.Db))

	unprotected := r.Group("/v1/")
	unprotected.POST("/user", postUser(svc.Db))
	unprotected.POST("/login", postLogin(svc.Db, svc.Secret))
}
