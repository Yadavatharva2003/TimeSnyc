
/*
 Simple fuzzy typeahead using scoring:
 - exact start match -> score 100
 - contains -> score 50
 - words start match -> score 75
 - fallback substring match
*/
export async function attachTypeahead(inputEl, onSelect){
  let cities = null;
  async function load(){
    if(cities) return cities;
    try{
      const res = await fetch('/assets/data/cities.json');
      cities = await res.json();
    }catch(e){ cities = {}; }
    return cities;
  }
  function score(q, text){
    const t = text.toLowerCase();
    const ql = q.toLowerCase();
    if(t === ql) return 200;
    if(t.startsWith(ql)) return 150;
    if(t.split(' ').some(w=>w.startsWith(ql))) return 125;
    if(t.includes(ql)) return 75;
    return 0;
  }
  function renderList(list, box){
    box.innerHTML='';
    list.slice(0,8).forEach(item=>{
      const el = document.createElement('div');
      el.className='ta-item';
      el.textContent = item.label;
      el.onclick = ()=>{ onSelect(item); box.innerHTML=''; };
      box.appendChild(el);
    });
    if(list.length===0){
      const el = document.createElement('div'); el.className='ta-empty'; el.textContent='No results'; box.appendChild(el);
    }
  }
  const box = document.createElement('div');
  box.className='ta-box';
  box.style.position='absolute';
  box.style.zIndex='9999';
  box.style.background='var(--surface)';
  box.style.border='1px solid rgba(0,0,0,0.06)';
  box.style.width='100%';
  box.style.maxHeight='260px';
  box.style.overflow='auto';
  box.style.borderRadius='8px';
  inputEl.parentNode.style.position='relative';
  inputEl.parentNode.appendChild(box);

  inputEl.addEventListener('input', async (e)=>{
    const q = inputEl.value.trim();
    if(!q){ box.innerHTML=''; return; }
    await load();
    const results = [];
    Object.keys(cities).forEach(k=>{
      const info = cities[k];
      const label = (info.city ? info.city + ' — ' : '') + k + (info.country ? ' ('+info.country+')' : '');
      const s = score(q, label);
      if(s>0) results.push({tz:k, label:label, score:s, lat:info.lat, lon:info.lon});
    });
    results.sort((a,b)=>b.score-a.score);
    renderList(results, box);
  });

  document.addEventListener('click', (e)=>{ if(!box.contains(e.target) && e.target!==inputEl) box.innerHTML=''; });
  return {show: ()=>box.style.display='block', hide: ()=>box.style.display='none'};
}
