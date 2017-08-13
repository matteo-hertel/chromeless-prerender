const { Chromeless } = require("chromeless");
const { wait } = require("./utils");
async function fetchHTML(url) {
    const chromeless = new Chromeless();
    let html = await chromeless
        .goto(url)
        .evaluate(() => {
            return wait(3000)
                .then(() => {
                    return document.getElementsByTagName('html')[0].innerHTML;
                });
        })
    await chromeless.end();
    return html;
}

module.exports = {
    fetchHTML
}
