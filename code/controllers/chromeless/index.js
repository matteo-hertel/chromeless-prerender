const { fetchHTML } = require(`${__dirname}/../../modules/chromelessWrapper`);
const acceptValidDomains = require(`${__dirname}/../../middlewares/acceptValidDomains`)
module.exports = (router) => {

    router.get('/api/v0.1/fetchHTML', acceptValidDomains, (req, res) => {

        fetchHTML(req.urlToFetch)
            .then(html => res.send(html))
            .catch(err => {
                console.error(err.stack);
            });
    });
}
