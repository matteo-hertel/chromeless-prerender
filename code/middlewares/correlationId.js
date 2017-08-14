/**
 * Corrlation ID middleware
 */
const uuidV1 = require('uuid/v1');
const correlationId = (router) => {
    router.use(function(req, res, next) {
        if (req.headers["X-Correlation-Id"]) {
            res.header("X-Correlation-Id", req.headers["X-Correlation-Id"]);
        } else {
            let correlationId = uuidV1();
            res.header("X-Correlation-Id", correlationId);
            req.headers["X-Correlation-Id"] = correlationId;
        }
        next();
    });
};

module.exports = correlationId;
