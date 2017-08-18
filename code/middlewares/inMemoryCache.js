const mcache = require("memory-cache");

function cache(duration = (process.env.DEFAULT_CACHE_DURATION || 10)) {
    return (req, res, next) => {
        let key = `__${process.env.APP_NAME}__${req.originalUrl || req.url}`
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            res.send(cachedBody)
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}

module.exports = cache;