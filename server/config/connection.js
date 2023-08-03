// require mongoose
const mongoose = require('mongoose');
// connect mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');
// export mongoose connection
module.exports = mongoose.connection;
