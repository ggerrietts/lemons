# Mister Lemons

Mister Lemons is a lemonade stand simulator. Its evolution is partly an
exercise in building the game, but mostly an exercise in learning various JS
development techniques.

## PSA to myself
`glide` does not like symlinks.


## TODO

- [x] clean auth/auth.go out of auth/service.go
- [x] add logging to auth middleware
- [x] handle sql nullable type
- [x] test remaining endpoints
- [x] make login store last login time
- [x] fix the dockerfile for vendor
- [x] js: get front end loading
- [x] js: remove immutable
- [x] js: inline "container" elements
- [x] js: build "modules"
- [x] js: be sure moment, lodash, router, redux, sagas all in
- [x] js: revise state shape
- [ ] xx: integrate authentication / login
  - [x] js: remove signup (add when needed)
  - [x] go: login endpoint returns user
  - [x] js: debug user fetch from login
  - [x] js: debug routes & such
- [x] go: restructure around passed-in cfg & db (closures)
- [x] go: restructure to be top-level
- [ ] go: store status endpoint
  - [ ] turn dynamic
    - [ ] calculate sales
    - [ ] adjust inventory
  - [ ] ledger model (or just roll up?)
- [ ] js: store status panel
- [ ] weather model


## Rethink:
- [ ] Store status
  - [ ] Cash position
  - [ ] Sales
    - [ ] Per day at first
    - [ ] Nice per-hour chart might be nice eventually
    - [ ] Changes when time moves
  - [ ] Expenses
    - [ ] Yesterday's total
    - [ ] Today's itemized expenses
    - [ ] Expenses can change between turns
  - [ ] Inventory
    - [ ] Prepared lemonade
    - [ ] Ingredients
    - [ ] Can change between turns
  - [ ] Weather
    - [ ] Day #
    - [ ] Forecast
    - [ ] Yesterday

## Projected Play
1. See store status:
  - Yesterday's sales
  - Yesterday's expenses
  - Weather for yesterday, today
2. Take turn:
  - Purchase
    - See prices
    - See current on hand
    - See projected on hand
    - See projected cost
    - Button to add qty
    - Button to commit *
  - Brew
    - See current on hand
    - See projected on hand
    - Button to add qty
    - See cost per unit
    - Set price
    - Button to commit *
  - Run the day

UI:
- daily report: weather, sales, yesterday's expenses
- "activity panel"

