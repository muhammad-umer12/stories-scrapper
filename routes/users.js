var express = require('express');
var router = express.Router();
const request = require('request');
/* GET users listing. */
router.get('/', function(req, res, next) {
  request("https://time.com/",(error,response,html)=>{

    if(!error && response.statusCode == 200)
    {
    

      let a = html.indexOf("latest-stories__item")
      let b = html.indexOf("hompage-section-v2")
      let c= html.substring(a,html.length-1)
      let find = c.indexOf("</ul>")
      let final  = c.substring(0,find)
  
      let result =[]
      function urlParser()
      { 
        hrefIndex = final.indexOf("href");
        final = final.substring(hrefIndex,html.length-1)
        let aIndex = final.indexOf(">");
      
      return  'https://time.com'+final.substring(6,aIndex-1)

      }

 

      function titlaParser()
      {
        h3Index = final.indexOf("latest-stories__item-headline");
        
        final = final.substring(h3Index+29
          ,html.length-1)
      
        let aIndex = final.indexOf("<");
      let ans = final.substring(2,aIndex)
        final = final.substring(aIndex,final.length)
        return ans
      }

     
      for(var i=0;i<6 ; i++)
      {
          result.push({link:urlParser(), title:titlaParser()})
      }

    
      
      

    
      res.json(result)
     
    }
    })
});

module.exports = router;
