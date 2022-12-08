const { verifyadmin } = require('../../middleware/auth')
const { handelValidation } = require('../../middleware/handelValidation')
const { addcountry, updatecountry, deletecountry, getcountry, getcountrys } = require('./controller/country')
//const { countryValidator } = require('./country.validation')
const countryrouter = require('express').Router()

// add country
// eslint-disable-next-line no-sequences
countryrouter.post('/country/add/:Uid',  addcountry)
// update country
countryrouter.post('/country/update/:Uid/:Coid',  updatecountry)
// delete country
countryrouter.delete('/country/delete/:Coid', deletecountry)
// get countrys
countryrouter.get('/countries', getcountrys)
// get country by ID
countryrouter.get('/country/:Coid',  getcountry)
module.exports = countryrouter
