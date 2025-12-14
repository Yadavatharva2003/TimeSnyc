(function(){
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  const root = document.documentElement;
  const set = (t)=>{ if(t==='dark') root.setAttribute('data-theme','dark'); else root.removeAttribute('data-theme'); localStorage.setItem('theme',t); };
  if(saved) set(saved);
  else if(prefersDark) set('dark');
  window.toggleTheme = ()=>{ const cur = document.documentElement.getAttribute('data-theme'); set(cur==='dark'?'light':'dark'); }
})();