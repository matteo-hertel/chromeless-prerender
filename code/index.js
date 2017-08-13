const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');
const fs = require("fs");

/**
 * Launches a debugging instance of Chrome.
 * @param {boolean=} headless True (default) launches Chrome in headless mode.
 *     False launches a full version of Chrome.
 * @return {Promise<ChromeLauncher>}
 */
function launchChrome(headless = true) {
    return chromeLauncher.launch({
        port: 9222,
        chromeFlags: [
            '--disable-gpu',
            headless ? '--headless' : ''
        ]
    });
}

(async function () {

    const chrome = await launchChrome();
    const protocol = await CDP({ port: chrome.port });

    // Extract the DevTools protocol domains we need and enable them.
    // See API docs: https://chromedevtools.github.io/devtools-protocol/
    const { Page, Runtime } = protocol;
    await Promise.all([Page.enable(), Runtime.enable()]);

    Page.navigate({ url: 'https://blog.matteohertel.com/post/featured-post' });
    // Wait for window.onload before doing stuff.
    Page.loadEventFired(async () => {
        setTimeout(async () => {
            const js = "document.getElementsByTagName('html')[0].innerHTML";
            // Evaluate the JS expression in the page.
            const result = await Runtime.evaluate({ expression: js });
            console.log(result);
            // await Page.captureScreenshot().then(base64png => {
            //     fs.writeFileSync('./screenshot.png', new Buffer(base64png.data, 'base64'));
            //     protocol.close();
            //     chrome.kill(); // Kill Chrom
            // });
            protocol.close();
            chrome.kill(); // Kill Chrome.
        }, 3000);
    });


})();

lol.evaluate(() => {
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    return wait(3000).then(() => {
        return document.getElementsByTagName('html')[0].innerHTML;
    });

})