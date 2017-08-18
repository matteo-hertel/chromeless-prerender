const { fetchHTML } = require(`${__dirname}/../../modules/chromelessWrapper`);
const acceptValidDomains = require(`${__dirname}/../../middlewares/acceptValidDomains`)
const cache = require(`${__dirname}/../../middlewares/inMemoryCache`)
module.exports = (router) => {

    router.get('/api/v0.1/fetchHTML', [acceptValidDomains, cache(300)], (req, res) => {
        console.log();
        fetchHTML(req.urlToFetch)
            .then(html => res.send(html))
            .catch(err => {
                console.error(err.stack);
            });
    });
}
