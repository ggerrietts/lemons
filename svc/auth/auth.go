package lemonauth

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/ggerrietts/lemons/svc/util"
	"gopkg.in/gin-gonic/gin.v1"
	"log"
	"net/http"
	"time"
)

func decodeToken(tokenString string) (jwt.MapClaims, error) {
	cfg := lemonutils.GetConfig()
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return 0, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(cfg.Secret), nil
	})
	if err != nil {
		return jwt.MapClaims{}, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	} else {
		return jwt.MapClaims{}, fmt.Errorf("Invalid token.")
	}
}

func generateToken(id int64) (string, error) {
	cfg := lemonutils.GetConfig()
	// user ID, timeout?
	expire := time.Now().Add(time.Hour * 6)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  id,
		"exp": expire.Unix(),
		"iat": time.Now().Unix(),
	})
	return token.SignedString([]byte(cfg.Secret))
}

func unauthorized(c *gin.Context, code int, message string) {
	c.JSON(code, gin.H{
		"code":    code,
		"message": message,
	})
}

func setNewCookie(c *gin.Context, userId int64) error {
	tokenstr, err := generateToken(userId)
	if err == nil {
		lemonutils.GinDebug("Setting token: ", tokenstr)
		c.SetCookie("jwt_token", tokenstr, 0, "", "", false, false)
		return nil
	}
	return err
}

type Login struct {
	Email    string `form:"email" json:"email" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}

func postLogin(c *gin.Context) {
	// process post
	// c.SetCookie on success
	var loginVals Login
	var user User
	if e1 := c.BindJSON(&loginVals); e1 != nil {
		lemonutils.GinDebug("ERROR: bad form values", e1)
		unauthorized(c, http.StatusBadRequest, "Missing 'email' or 'password'.")
		return
	}
	db, err := lemonutils.GetDb()
	if err != nil {
		lemonutils.GinDebug("ERROR: database error", err)
		unauthorized(c, http.StatusInternalServerError, "Please retry.")
		return
	}
	user, err = GetUserByEmail(db, loginVals.Email)
	if err != nil {
		lemonutils.GinDebug("Error: bad fetch", err)
		unauthorized(c, http.StatusUnauthorized, "Unauthorized.")
		return
	}
	if err = CheckPassword(user.Password, loginVals.Password); err != nil {
		lemonutils.GinDebug("Error: bad password", err)
		unauthorized(c, http.StatusUnauthorized, "Unauthorized.")
		return
	}
	if err = setNewCookie(c, user.ID); err != nil {
		lemonutils.GinDebug("Error: failed setting cookie", err)
		unauthorized(c, http.StatusInternalServerError, "Internal server error.")
		return
	}
	c.JSON(http.StatusOK, gin.H{"result": "OK"})
}

func getLogout(c *gin.Context) {
	c.SetCookie("jwt_token", "deleted", 0, "", "", true, true)
	unauthorized(c, http.StatusOK, "Logged out.")
}

func RegisterAuthHandlers(r *gin.Engine) {

	protected := r.Group("/", AuthMiddleware())
	protected.GET("/logout", getLogout)

	unprotected := r.Group("/")
	unprotected.POST("/login", postLogin)
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// get cookie
		cookiestr, err := c.Cookie("jwt_token")
		if err != nil {
			lemonutils.GinDebug("ERROR: no cookie", err)
			unauthorized(c, http.StatusUnauthorized, "Unauthorized.")
		}

		// decode
		claims, err := decodeToken(cookiestr)
		if err != nil {
			lemonutils.GinDebug("ERROR: bad decode", err)
			unauthorized(c, http.StatusUnauthorized, err.Error())
			return
		}

		// extract claims
		userId, id_ok := claims["id"].(int64)
		issued, iss_ok := time.Unix(claims["orig_iat"].(int64), 0)
		if !(id_ok && iss_ok) {
			lemonutils.GinDebug("ERROR: type assertions failed -- id", id_ok, "iss", iss_ok)
			unauthorized(c, http.StatusBadRequest, "invalid token values")
			return
		}

		// create new cookie maybe
		if time.Now().After(issued.Add(time.Hour)) {
			cookieFail := setNewCookie(c, userId)
			if cookieFail != nil {
				// we'll let this slide i guess
				log.Printf("error refreshing token: %v", err)
			}
		}

		// set userId into context
		c.Set("userId", userId)
		c.Next()
	}
}
