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
- [ ] get front end loading
- [ ] remove immutable
- [ ] inline "container" elements
- [ ] build "modules"
- [ ] revise state shape
- [ ] be sure moment, lodash, router, redux, sagas all in
- [ ] integrate authentication / login
- [ ] restructure around passed-in cfg & db (closures)
- [ ] offload a lot of the date logic to the backend
- [ ] finish user mutations
- [ ] spend some time on the domain model
- [ ] hook up "brew" buttons
  - [x] write the UI
  - [x] hook in reducers
  - [ ] build actions
  - [ ] write action reducer
- [x] fix and shore up tests
- [ ] revisit ledger
- [ ] revisit weather: temp
- [ ] write in a simple sales formula
