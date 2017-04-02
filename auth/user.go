package lemonsauth

import (
	"errors"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/mgutz/logxi/v1"
	"gopkg.in/gin-gonic/gin.v1"
	"net/http"
	"strconv"
)

var (
	ErrInconsistentIDs = errors.New("inconsistent IDs")
	ErrAlreadyExists   = errors.New("already exists")
	ErrNotFound        = errors.New("not found")
)

// User functions
func postUser(db *sqlx.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var u User
		var err error

		ctx.BindJSON(&u)
		u.Password, err = HashPassword(u.Password)
		if err != nil {
			log.Debug("Error: hashing failure", "error", err)
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "hashing failure"})
		} else if err = u.Create(db); err != nil {
			log.Debug("Error: database failure", "error", err)
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "database failure"})
		} else {
			u.Sanitize()
			ctx.JSON(http.StatusOK, gin.H{"result": u})
		}
	}
}

func getUser(db *sqlx.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var user User
		var id int64
		var err error

		string_id := ctx.Params.ByName("id")
		id, err = strconv.ParseInt(string_id, 10, 64)
		if err != nil {
			log.Debug("Error: bad user id", "error", err)
			unauthorized(ctx, http.StatusBadRequest, "bad user id")
		}
		if user, err = GetUser(db, id); err != nil {
			log.Debug("Error: record not found", "error", err)
			ctx.JSON(http.StatusNotFound, gin.H{"error": "record not found"})
			return
		}
		user.Sanitize()
		ctx.JSON(http.StatusOK, gin.H{"user": user})
		return
	}
}

// func putUser(ctx *gin.Context) {
// 	if id != u.ID {
// 		return ErrInconsistentIDs
// 	}
// 	var err error
// 	u.Password, err = HashPassword(u.Password)
// 	if err != nil {
// 		return err
// 	}
// 	return s.db.Save(&u).Error
// }
//
// func PatchUser(ctx *gin.Context) {
// 	if id != u.ID {
// 		return ErrInconsistentIDs
// 	}
// 	if u.Password != "" {
// 		var err error
// 		u.Password, err = HashPassword(u.Password)
// 		if err != nil {
// 			return err
// 		}
// 	}
// 	return s.db.Updates(&u).Error
// }
//
// func DeleteUser(ctx *gin.Context) {
// 	var u = User{ID: id}
// 	return s.db.Delete(u).Error
// }
