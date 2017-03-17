package lemonauth

import (
	"errors"
	"github.com/ggerrietts/lemons/svc/util"
	"gopkg.in/gin-gonic/gin.v1"
	"log"
	"net/http"
	"strconv"
)

func RegisterServiceHandlers(r *gin.Engine) {

	protected := r.Group("/", AuthMiddleware())
	protected.GET("/user/:id", getUser)
	// protected.PUT("/user/:id", putUser)
	// protected.PATCH("/user/:id", patchUser)
	// protected.DELETE("/user/:id", deleteUser)

	unprotected := r.Group("/")
	unprotected.POST("/user", postUser)
}

var (
	ErrInconsistentIDs = errors.New("inconsistent IDs")
	ErrAlreadyExists   = errors.New("already exists")
	ErrNotFound        = errors.New("not found")
)

// User functions
func postUser(ctx *gin.Context) {
	db, err := lemonutils.GetDb()
	if err != nil {
		lemonutils.GinDebug("Error: database failure", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "database failure"})
		return
	}
	var u User
	ctx.BindJSON(&u)
	u.Password, err = HashPassword(u.Password)
	if err != nil {
		lemonutils.GinDebug("Error: hashing failure", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "hashing failure"})
	} else if err = u.Create(db); err != nil {
		lemonutils.GinDebug("Error: database failure", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "database failure"})
	} else {
		// TODO: should sanitize u before return
		ctx.JSON(http.StatusOK, gin.H{"result": u})
	}
}

func getUser(ctx *gin.Context) {
	var user User
	var id int64
	db, err := lemonutils.GetDb()
	if err != nil {
		lemonutils.GinDebug("Error: database failure", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "database failure"})
		return
	}
	string_id := ctx.Params.ByName("id")
	id, err = strconv.ParseInt(string_id, 10, 64)
	if err != nil {
		lemonutils.GinDebug("Error: bad user id", err)
		unauthorized(ctx, http.StatusBadRequest, "bad user id")
	}
	if user, err = GetUser(db, id); err != nil {
		lemonutils.GinDebug("Error: record not found", err)
		ctx.JSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}
	user.Password = ""
	ctx.JSON(http.StatusOK, gin.H{"result": user})
	return
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
