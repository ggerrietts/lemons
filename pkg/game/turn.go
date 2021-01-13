package game

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/sirupsen/logrus"
)

// TurnRequest contains everything we need to process a turn
type TurnRequest struct {
	UserID     string `json:"user_id"`
	Purchasing int64  `json:"purchasing"`
	Preparing  int64  `json:"preparing"`
	Price      int64  `json:"price"`
}

// TurnRequestHandler coordinates the execution of a turn
func TurnRequestHandler(w http.ResponseWriter, r *http.Request) {
	tr := TurnRequest{}
	err := json.NewDecoder(r.Body).Decode(&tr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	logrus.WithField("tr.UserID", tr.UserID).Debug("fetched userid")
	st, err := loadOrCreateStorefront(r.Context(), tr.UserID)
	if err != nil && err != sql.ErrNoRows {
		logrus.WithError(err).Error("loading storefront")
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	logrus.WithField("st", st).Debug("retrieved storefront")

	next := st.ProcessTurn(tr.Purchasing, tr.Preparing, tr.Price)
	err = next.Save(r.Context())
	if err != nil {
		logrus.WithError(err).Error("saving storefront")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	j, err := json.Marshal(next)
	if err != nil {
		logrus.WithError(err).Debug("marshalling JSON")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(j)
}
