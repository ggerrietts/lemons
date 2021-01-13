package game

import (
	"context"
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/sirupsen/logrus"
)

// DashboardRequest models a request to load a dashboard
type DashboardRequest struct {
	UserID string `json:"user_id"`
}

// DashboardRequestHandler coordinates the response to a dashboard load
func DashboardRequestHandler(w http.ResponseWriter, r *http.Request) {
	dr := DashboardRequest{}
	err := json.NewDecoder(r.Body).Decode(&dr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	logrus.WithField("dr.UserID", dr.UserID).Debug("fetched userid")
	st, err := loadOrCreateStorefront(r.Context(), dr.UserID)
	if err != nil && err != sql.ErrNoRows {
		logrus.WithError(err).Error("loading storefront")
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	j, err := json.Marshal(st)
	if err != nil {
		logrus.WithError(err).Debug("marshalling JSON")
		w.WriteHeader(http.StatusBadRequest)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(j)
}

func loadOrCreateStorefront(ctx context.Context, userID string) (*Storefront, error) {
	st, err := LoadStorefront(ctx, userID)
	if err != nil && err != sql.ErrNoRows {
		logrus.WithError(err).Error("loading storefront")
		return nil, err
	}
	logrus.WithField("st", st).Debug("retrieved storefront")
	if err == sql.ErrNoRows {
		logrus.WithError(err).Error("loading storefront")
		st = NewStorefront(userID)
		err = st.Save(ctx)
		if err != nil {
			logrus.WithError(err).Error("saving new storefront")
			return nil, err
		}
	}
	return st, nil
}
