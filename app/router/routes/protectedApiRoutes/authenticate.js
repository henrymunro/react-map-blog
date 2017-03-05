const { logger, logError } = require('../../../logger')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const Account = require('./../../../database/models/accountModel')
const loggerModule = 'authenticate.js'

logger.info('Loading in authenticate.js route', {loggerModule, startUp: true})

/*
* POST /api/authenticate route to authenticate user and pass back a tocken
*/
function authenticateUser (req, res) {
  logger.debug('Request recieved to authenticate user', {loggerModule, username: req.body.username})
  const { username, password } = req.body
// find the user
  Account.findOne({ username }, (err, user) => {
    if (err) logError(err, 'Error with database lookup when authenticating user', loggerModule)
// if user does not exist return error
    if (!user) {
      logger.info('User authentication failed, no user exists', {loggerModule, username})
      res.status(403).send({ success: false, message: 'Authentication failed. User not found.' })
    } else if (user) {
// check if password matches
      if (user.password !== password) {
        logger.info('User authentication failed, password incorrect', {loggerModule, username})
        res.status(403).send({ success: false, message: 'Authentication failed. Wrong password.' })
      } else {
// if user is found and password is right
// create a token
        logger.info('User sucessfully authenticated', {loggerModule, username})
        const token = jwt.sign(user, req.app.get('JWTSecret'), {
          expiresIn: 24 * 60 * 60 // expires in 24 hours
        })

// Encrypts token before sending
        const encryptedToken = _encrypt(token, req.app.get('cookieSecret'))
        req.session.sessionid = encryptedToken

// return the information including token as JSON
        res.status(200).send({
          success: true,
          message: 'Enjoy your token!',
          token: encryptedToken
        })
      }
    }
  })
};

function _encrypt (text, secret) {
  var cipher = crypto.createCipher('aes-256-ctr', secret)
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

module.exports = { authenticateUser }
