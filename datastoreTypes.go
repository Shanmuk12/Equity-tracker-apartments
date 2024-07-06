package main

import (
	"fmt"
	"time"
)

type Price struct {
	Price         int
	TermLength    int
	DateRetrieved time.Time
}

type Unit struct {
	UnitID        string
	IsAvailable   bool
	BuildingID    string
	AvailableDate string
	Sqft          int
	Bed           int
	Bath          float32
	FloorplanID   string
	FloorplanName string
	Floor         string
	Description   string   `datastore:",noindex"`
	Amenities     []string `datastore:",noindex"`
	Special       string   `datastore:",noindex"`
	Floorplan     string
	Photos        []string `datastore:",noindex"`
	Videos        []string `datastore:",noindex"`
	Matterports   []string `datastore:",noindex"`
	Prices        []Price  `datastore:"-"`
}

type UnitType struct {
	Name  string
	Units []Unit `datastore:"-"`
}

type Building struct {
	Name      string
	UnitTypes []UnitType `datastore:"-"`
}

func NewBuilding(a ApartmentData) *Building {
	b := new(Building)

	b.Name = a.BuildingName

	return b
}

func FillUnitData(u *Unit, a *AvailableUnit) {
	u.UnitID = a.UnitID
	u.BuildingID = a.BuildingID
	u.AvailableDate = a.AvailableDate
	u.Sqft = a.SqFt
	u.Bed = a.Bed
	u.Bath = a.Bath
	u.FloorplanID = a.FloorplanID
	u.FloorplanName = a.FloorplanName
	u.Floor = a.Floor
	u.Description = a.Description
	u.Amenities = func() []string {
		p := make([]string, len(a.Amenities))
		for i, a := range a.Amenities {
			p[i] = a.Name
		}
		return p
	}()

	u.Special = fmt.Sprintf(
		"Active: %s, Title: %s, Expires: %s",
		func() string {
			if a.Special.Active {
				return "true"
			} else {
				return "false"
			}
		}(),
		a.Special.Title,
		a.Special.Expires)
	u.Floorplan = a.Floorplan
	u.Photos = func() []string {
		p := make([]string, len(a.Photos))
		for i, photo := range a.Photos {
			p[i] = photo.ImageURL
		}
		return p
	}()
	u.Videos = func() []string {
		p := make([]string, len(a.Videos))
		for i, photo := range a.Videos {
			p[i] = photo.Key
		}
		return p
	}()
	u.Matterports = func() []string {
		p := make([]string, len(a.Matterports))
		for i, photo := range a.Matterports {
			p[i] = photo.Key
		}
		return p
	}()
}
