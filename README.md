## Mister Lemons

Mister Lemons is a lemonade stand simulator. Its evolution is partly an
exercise in building the game, but mostly an exercise in learning various JS
development techniques.



## TODO

- [x] docker-compose file
- [x] schema creation
- [x] bind addr, db string env vars
- [x] user, session API finalized
- [x] db integration
  - [x] re-integrate with sqlx
    - [x] add models to models.go
    - [x] add fetch / mutate functions for models
  - [x] dump scripts
- [x] clean auth/auth.go out of auth/service.go
- [x] add logging to auth middleware
- [ ] test remaining endpoints
- [ ] finish mutations
- [ ] get front end loading
- [ ] be sure moment, lodash, router, redux, sagas all in
- [ ] offload a lot of the date logic to the backend
- [ ] remove immutable
- [ ] inline "container" elements
- [ ] build "modules"
- [ ] revise state shape
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
