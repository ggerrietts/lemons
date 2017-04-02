package lemonsshop

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/mgutz/logxi/v1"
	"gopkg.in/gin-gonic/gin.v1"
	"net/http"
)

func fetchShopWithInventory(db *sqlx.DB, userId int64) (ShopWithInventory, error) {
	shop, err := GetShopByUser(db, userId)
	if err != nil {
		return ShopWithInventory{}, err
	}
	shop_inv = ShopWithInventory(shop)
	shop_inv.Inventories, err = GetInventoriesByShop(db, shop.ID)
	if err != nil {
		return ShopWithInventory{}, err
	}
	return shop_inv, err
}

func createNewShop(db *sqlx.DB, userId int64) error {
	var shop = Shop{
		UserID: userId,
	}
	err := shop.Create(db)
	if err != nil {
		log.Debug("Failed to create shop", "userId", userId)
		return err
	}

}

func getShop(db *sqlx.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		uid_if, ok := c.Get("userId")
		if !ok {
			send_error(c, http.StatusInternalServerError, "userId not found in context")
			return
		}
		uid, ok := uid_if.(int64)
		if !ok {
			send_error(c, http.StatusInternalServerError, "userId not numeric")
			return
		}
		shop_inv := fetchShopWithInventory(uid)
		return
	}
}

func postShop(db *sqlx.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
	}
}
