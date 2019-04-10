const request = require("request")
var userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36';
var base_url = 'undefeated.com';
const parseUrl = require("parse-url")
const parseString = require('xml2js').parseString
const perf = require('execution-time')();

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

function tryParseJSON(jsonString) {
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            return o;
        }
    } catch (e) {}
    return false;
};

function monitor(kw){
    perf.start();
    request(
        {
        url: `http://${base_url}/products.json`,
        followAllRedirects: true,
        method: 'get',
        headers: {
            Origin: base_url,
            'User-Agent': userAgent,
            //'Content-Type': 'application/json;charset=UTF-8',
            //Accept:
            //'application/json, text/plain, */*',
            //Referer: base_url,
            //'Accept-Language': 'en-US,en;q=0.8',
        },
        },
        function(err, res, body) {
            if (err || body === undefined) {
                return callback(null, 'No response data was sent back.');
            }
            var products = JSON.parse(body).products;
            if (products) {
                /*(var response = {
                    productDetails: []
                }*/
                //console.log(products);
                console.log(products.length)
                for(var i = 0; i < products.length; i++) {
                    if(products[i].title.includes(kw)){
                        const results = perf.stop();
                        console.log(products[i].variants[0].id + " size: " + products[i].variants[0].option2);
                        console.log(results.time + "ms");
                    }
                }
                
                //return response.productDetails;
            }
    
        });
};

console.log(monitor('Visor'.replace(/\w/g, l => l.toUpperCase())));
sleep(20)
