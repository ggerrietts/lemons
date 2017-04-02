package lemonsauth

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"gopkg.in/guregu/null.v3"
	"strings"
	"time"
)

type User struct {
	ID          int64     `json:"id,omitempty"`
	Email       string    `json:"email"`
	Name        string    `json:"name"`
	Password    string    `json:"password"`
	LastLoginAt null.Time `db:"last_login_at" json:"last_login_at"`
	UpdatedAt   time.Time `db:"updated_at" json:"updated_at"`
	CreatedAt   time.Time `db:"created_at" json:"created_at"`
}

func GetUser(db *sqlx.DB, id int64) (User, error) {
	var u User
	err := db.Get(&u, "SELECT * from users where id = ?", id)
	if err != nil {
		return User{}, err
	}
	return u, nil
}

func GetUserByEmail(db *sqlx.DB, email string) (User, error) {
	var u User
	err := db.Get(&u, "SELECT * from users where email = ?", email)
	if err != nil {
		return User{}, err
	}
	return u, nil
}

func (u *User) OmitForFields(fields []string) map[string]bool {
	omits := map[string]bool{
		"Email":       true,
		"Name":        true,
		"Password":    true,
		"LastLoginAt": true,
	}
	for _, field := range fields {
		omits[field] = false
	}
	return omits
}

func (u *User) Update(db *sqlx.DB, omit map[string]bool) error {
	var parts []string
	if skip := omit["Email"]; !skip {
		parts = append(parts, "email = :email")
	}
	if skip := omit["Name"]; !skip {
		parts = append(parts, "name = :name")
	}
	if skip := omit["Password"]; !skip {
		parts = append(parts, "password = :password")
	}
	if skip := omit["LastLoginAt"]; !skip {
		parts = append(parts, "last_login_at = :last_login_at")
	}
	parts = append(parts, "updated_at = NOW()")
	stmt := "UPDATE users SET " + strings.Join(parts, ", ") + " WHERE id = :id"
	_, err := db.NamedExec(stmt, u)
	return err
}

func (u *User) Create(db *sqlx.DB) error {
	stmt := "INSERT INTO users "
	stmt += "(email, name, password, updated_at, created_at) "
	stmt += "VALUES (:email, :name, :password, NOW(), NOW())"
	result, err := db.NamedExec(stmt, u)
	if err != nil {
		return err
	}
	id, res_err := result.LastInsertId()
	if res_err == nil {
		u.ID = id
	}
	return res_err
}

func (u *User) Sanitize() {
	u.Password = ""
}
