package lemonsauth

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/mgutz/logxi/v1"
	"gopkg.in/gin-gonic/gin.v1"
	"gopkg.in/guregu/null.v3"
	"net/http"
	"time"
)

type Login struct {
	Email    string `form:"email" json:"email" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}

func getLogin(db *sqlx.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user User
		var uid int64
		var err error

		val, ok := c.Get("userId")
		if !ok {
			log.Debug("No cookie found, I guess!")
			unauthorized(c, http.StatusUnauthorized, "not logged in")
		}
		uid, ok = val.(int64)
		if !ok {
			log.Debug("ERROR: bad decode of uid")
			unauthorized(c, http.StatusUnauthorized, "user not found")
		}
		user, err = GetUser(db, uid)
		if err != nil {
			log.Debug("ERROR: no such user omae", err)
			unauthorized(c, http.StatusUnauthorized, "user not found")
		}
		user.Sanitize()
		c.JSON(http.StatusOK, gin.H{"user": user})
	}
}

func postLogin(db *sqlx.DB, secret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		// process post
		// c.SetCookie on success
		var loginVals Login
		var user User
		var err error

		if e1 := c.BindJSON(&loginVals); e1 != nil {
			log.Debug("ERROR: bad form values", "error", e1)
			unauthorized(c, http.StatusBadRequest, "Missing 'email' or 'password'.")
			return
		}
		user, err = GetUserByEmail(db, loginVals.Email)
		if err != nil {
			log.Debug("Error: bad fetch", "error", err)
			unauthorized(c, http.StatusUnauthorized, "Unauthorized.")
			return
		}
		if err = CheckPassword(user.Password, loginVals.Password); err != nil {
			log.Debug("Error: bad password", "error", err)
			unauthorized(c, http.StatusUnauthorized, "Unauthorized.")
			return
		}
		if err = setNewCookie(c, user.ID, secret); err != nil {
			log.Debug("Error: failed setting cookie", "error", err)
			unauthorized(c, http.StatusInternalServerError, "Internal server error.")
			return
		}
		user.LastLoginAt = null.TimeFrom(time.Now())
		err = user.Update(db, user.OmitForFields([]string{"LastLoginAt"}))
		if err != nil {
			log.Debug("Error: failed updating last login", "error", err)
			// let this one pass
		}
		user.Sanitize()
		c.JSON(http.StatusOK, gin.H{"user": user})
	}
}

func getLogout(db *sqlx.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		max_age := 6 * 60 * 60
		c.SetCookie("jwt_token", "deleted", max_age, "", "", true, true)
		unauthorized(c, http.StatusOK, "Logged out.")
	}
}
