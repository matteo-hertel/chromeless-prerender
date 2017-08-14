const url = require("url");
const validDomains = ["matteohertel.com", "matteohertel.uk", "hertel.me.uk"];
module.exports = (req, res, next) => {
    req.urlToFetch = req.query.url;
    let validateDomains = validDomains.filter((domain) => {
        return req.urlToFetch.indexOf(domain) !== -1;
    });
    if (!validateDomains.length) {
        res.status(400);
        res.send();
    } else {

        next();
    }
};


