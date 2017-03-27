package lemonsauth

import (
	"github.com/elithrar/simple-scrypt"
)

func HashPassword(pw string) (string, error) {
	ba, err := scrypt.GenerateFromPassword([]byte(pw), scrypt.DefaultParams)
	if err != nil {
		return "", err
	}
	return string(ba), nil
}

func CheckPassword(hash string, pw string) error {
	return scrypt.CompareHashAndPassword([]byte(hash), []byte(pw))
}
