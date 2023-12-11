function apiAuth(req, res, next) {
    const config = require('../../../config.json');
    const password = config.API_KEY
    const apiKey = req.headers['api-key'];

    if(apiKey && apiKey === password) {
        next();
    }else {
        res.status(401).json({ error: 'Unauthorized'})
    }
}
module.exports = apiAuth;