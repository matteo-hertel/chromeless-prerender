const { Chromeless } = require("chromeless");
const chromeless = new Chromeless();

async function fetchHTML(url) {
    let html = await chromeless
        .goto(url)
        .evaluate(() => {
            return wait(3000).then(() => {
                return document.getElementsByTagName('html')[0].innerHTML;
            });
        })
    await chromeless.end();
    return html;
}
fetchHTML('https://blog.matteohertel.com/post/featured-post')
    .then(html => console.log(html))
    // .then(chromeless.end())
    .catch(err => {
        console.error(err.stack);
    });