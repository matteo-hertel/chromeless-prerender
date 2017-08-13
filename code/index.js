const { fetchHTML } = require("./modules/chromelessWrapper");

fetchHTML('https://blog.matteohertel.com/post/featured-post')
    .then(html => console.log(html))
    // .then(chromeless.end())
    .catch(err => {
        console.error(err.stack);
    });