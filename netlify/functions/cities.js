const fs = require('fs'); const path = require('path');
exports.handler = async function(event, context){
  try{
    const q = (event.queryStringParameters && event.queryStringParameters.q) ? event.queryStringParameters.q.toLowerCase() : '';
    const page = parseInt((event.queryStringParameters && event.queryStringParameters.page) || '1',10);
    const per = 40;
    const dataPath = path.join(process.cwd(),'public','assets','data','cities.json');
    const raw = fs.readFileSync(dataPath,'utf8');
    const obj = JSON.parse(raw);
    const items = Object.keys(obj).map(k=> ({tz:k, city: obj[k].city, country: obj[k].country, lat: obj[k].lat, lon: obj[k].lon}) );
    const filtered = q ? items.filter(it => (it.city && it.city.toLowerCase().includes(q)) || (it.country && it.country.toLowerCase().includes(q)) || it.tz.toLowerCase().includes(q) ) : items;
    const start = (page-1)*per; const paged = filtered.slice(start, start+per);
    return { statusCode: 200, body: JSON.stringify({ results: paged, total: filtered.length, page }) };
  }catch(e){ return { statusCode: 500, body: JSON.stringify({error: String(e)}) }; }
};