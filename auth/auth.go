package lemonsauth

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/ggerrietts/lemons/svc/util"
	"github.com/mgutz/logxi/v1"
	"gopkg.in/gin-gonic/gin.v1"
	"gopkg.in/guregu/null.v3"
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
	c.Abort()
}

func setNewCookie(c *gin.Context, userId int64) error {
	tokenstr, err := generateToken(userId)
	if err == nil {
		log.Debug("Setting token: ", "token", tokenstr)
		c.SetCookie("jwt_token", tokenstr, 0, "", "", false, false)
		return nil
	}
	return err
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// get cookie
		cookiestr, err := c.Cookie("jwt_token")
		if err != nil {
			log.Debug("ERROR: no cookie", "error", err)
			unauthorized(c, http.StatusUnauthorized, "Unauthorized.")
		}

		// decode
		claims, err := decodeToken(cookiestr)
		if err != nil {
			log.Debug("ERROR: bad decode", "error", err)
			unauthorized(c, http.StatusUnauthorized, err.Error())
			return
		}

		// extract claims
		userId, id_ok := claims["id"].(float64)
		issuedTs, iss_ok := claims["iat"].(float64)
		if !(id_ok && iss_ok) {
			log.Debug("ERROR: type assertions failed", "id", id_ok, "iss", iss_ok)
			unauthorized(c, http.StatusBadRequest, "invalid token values")
			return
		}

		issued := time.Unix(int64(issuedTs), 0)

		// create new cookie maybe
		if time.Now().After(issued.Add(time.Hour)) {
			cookieFail := setNewCookie(c, int64(userId))
			if cookieFail != nil {
				// we'll let this slide i guess
				log.Debug("error refreshing token:", "error", err)
			}
		}

		// set userId into context
		c.Set("userId", int64(userId))
		c.Next()
	}
}
