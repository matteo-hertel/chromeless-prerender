const { Chromeless } = require("chromeless");
const chromeless = new Chromeless();

async function fetchHTML() {
    let html = await chromeless
        .goto('https://blog.matteohertel.com/post/featured-post')
        .evaluate(() => {
            function wait(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            return wait(3000).then(() => {
                return document.getElementsByTagName('html')[0].innerHTML;
            });

        })
    return html;
    await chromeless.end();
}
fetchHTML()
    .then(html => console.log(html))
    .catch(console.error.bind(console));