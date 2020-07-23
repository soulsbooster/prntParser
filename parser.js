const puppeteer = require('puppeteer');

(async () => {
    // Set up browser and page.
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 926 });

    // Navigate to this blog post and wait a bit.
    const url = 'nvtj';
    const goTo = 'https://prnt.sc/';
    const path = 'skrin/';


    var allArrays = [['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','1','2','3','4','5','6','7','8','9','0'], ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','1','2','3','4','5','6','7','8','9','0']];

    function allPossibleCases(arr) {
        if (arr.length === 0) {
            return [];
        }
        else if (arr.length ===1){
            return arr[0];
        }
        else {
            var result = [];
            var allCasesOfRest = allPossibleCases(arr.slice(1));  // recur with the rest of array
            for (var c in allCasesOfRest) {
                for (var i = 0; i < arr[0].length; i++) {
                    result.push(arr[0][i] + allCasesOfRest[c]);
                }
            }
            return result;
        }

    }
    var r=allPossibleCases(allArrays);
    console.log(r.length);


    for (var i = 0; i <= r.length; i++)
    {
        try {
            await page.goto(goTo+url+r[i]);

            console.log(goTo+url+r[i]);
            await page.waitForSelector('body > div.image-constrain.js-image-wrap > div > div > img');

            // Select the #svg img element and save the screenshot.
            const Image = await page.$('body > div.image-constrain.js-image-wrap > div > div > img');
            try {
                await Image.screenshot({
                    path: path + url + r[i] + '.png',
                    omitBackground: true,
                });
            } catch (e) {
                await browser.close();
                console.log('Can\'t find create file path' + url + r[i] +' .png');
            }

        } catch (e) {
            console.log('Can\'t find go to '+ goTo + url + r[i]);
        }

    }

    await browser.close('done');
})();
