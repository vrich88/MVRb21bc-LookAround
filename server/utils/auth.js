// require jsonwebtoken dependency
const jwt = require('jsonwebtoken');
// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';
// export authMiddleware & signToken
module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req, res, next) {
    // allows token to be sent via req.query or headers or body
    let token = req.query.token || req.headers.authorization || req.body.token;
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    // if no token return request
    if (!token) {
      return req;
    }
    // try verify token and get user data
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      // catch error and console log invalid message
    } catch {
      console.log('Invalid token');
    }
    // send to next endpoint
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};