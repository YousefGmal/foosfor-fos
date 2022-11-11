const { verifyadmin } = require('../../middleware/auth')
const { handelValidation } = require('../../middleware/handelValidation')
const { addoffer, updateoffer, deleteoffer, getoffer, getoffers } = require('./controller/offer')
//const { offerValidator } = require('./offer.validation')
const offerrouter = require('express').Router()

// add offer
// eslint-disable-next-line no-sequences
offerrouter.post('/offer/add/:Uid',  addoffer)
// update offer
offerrouter.post('/offer/update/:Uid/:OFid',  updateoffer)
// delete offer
offerrouter.delete('/offer/delete/:OFid', deleteoffer)
// get offers
offerrouter.get('/offers', getoffers)
// get offer by ID
offerrouter.get('/offer/:OFid',  getoffer)
module.exports = offerrouter
