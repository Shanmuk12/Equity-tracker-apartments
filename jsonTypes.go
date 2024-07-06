package main

type term struct {
	Length int
	Price  int
}

type special struct {
	Active  bool
	Title   string
	Expires string
}

type amenity struct {
	Name string
	Icon string
}

type media struct {
	Key          string
	ID           int `json:"Id"`
	MediaTags    string
	Caption      string
	DisplayOrder int
	MediaID      int `json:"MediaId"`
}

type photo struct {
	Alt          string
	Caption      string
	DisplayOrder int
	ID           int    `json:"Id"`
	ImageURL     string `json:"ImageUrl"`
	MediaID      int    `json:"MediaId"`
	MediaTags    []string
}

type AvailableUnit struct {
	LedgerID      string `json:"LedgerId"`
	UnitID        string `json:"UnitId"`
	BuildingID    string `json:"BuildingId"`
	AvailableDate string
	BestTerm      term
	Terms         []term
	SqFt          int
	Bed           int
	Bath          float32
	FloorplanID   string `json:"FloorplanId"`
	FloorplanName string
	Floor         string
	Description   string
	Amenities     []amenity
	Special       special
	Floorplan     string
	Photos        []photo
	Videos        []media
	Matterports   []media
}

type bedroomType struct {
	ID             int `json:"Id"`
	DisplayName    string
	BedroomCount   int
	AvailableUnits []AvailableUnit
}

type tileOptions struct {
	DisplaySqFt          bool
	DisplayFloorPlanName bool
}

type tileInfo struct {
	Order     int
	IsVisible bool
}

type ilsPhone struct {
	IlsID       int `json:"IlsId"`
	PhoneNumber string
}

// ApartmentData The JSON structure for apartment data from Equity Residential Sites
type ApartmentData struct {
	BuildingName            string
	BedroomTypes            []bedroomType
	PremiumUnits            []bedroomType
	DefaultView             string
	UnitDisplayCount        int
	PrimaryNeighborhoodURL  string `json:"PrimaryNeighborhoodUrl"`
	MainPhone               string
	IlsPhones               []ilsPhone
	PaidSearchPhone         string
	TileOptions             tileOptions
	HeaderPricingDisclaimer string
	TileInfo                tileInfo
}
