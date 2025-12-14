// ads-manager.js - dynamic ad loader triggered after user consent
const ADS_CLIENT = 'ca-pub-REPLACE_WITH_YOUR_PUBID'; // <-- replace with your AdSense publisher ID

function injectAdSenseScript(){
  if(window.__ts_ads_loaded) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  s.setAttribute('data-ad-client', ADS_CLIENT);
  document.head.appendChild(s);
  window.__ts_ads_loaded = true;
}

const registry = [];

export function registerAdSlot(el){
  registry.push(el);
  if(window.__ts_ads_loaded){
    renderSlot(el);
  }
}

function renderSlot(el){
  if(el.dataset.rendered) return;
  const ad = document.createElement('ins');
  ad.className = 'adsbygoogle';
  ad.style.display = 'block';
  ad.setAttribute('data-ad-client', ADS_CLIENT);
  ad.setAttribute('data-ad-slot', el.dataset.slot || '');
  ad.setAttribute('data-ad-format', el.dataset.format || 'auto');
  el.innerHTML = '';
  el.appendChild(ad);
  try{
    (adsbygoogle = window.adsbygoogle || []).push({});
    el.dataset.rendered = '1';
  }catch(e){}
}

export function loadAdsNow(){
  injectAdSenseScript();
  setTimeout(()=>registry.forEach(renderSlot), 800);
}

window.__timesyncAcceptAds = ()=>{ import('/src/scripts/ads-manager.js').then(mod => mod.loadAdsNow()).catch(()=>{/*fail silently*/}); };
