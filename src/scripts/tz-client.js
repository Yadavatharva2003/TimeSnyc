export function convertTime(){ 
  const fromTz = document.getElementById('fromTz').value;
  const toTz = document.getElementById('toTz').value;
  const input = document.getElementById('timeInput').value;
  if(!input){ document.getElementById('result').textContent = 'Enter date/time first.'; return; }
  const d = new Date(input);
  try{
    const options = {timeZone: toTz, year:'numeric',month:'short',day:'numeric',hour:'numeric',minute:'2-digit',hour12:false};
    const out = new Intl.DateTimeFormat([], options).format(d);
    document.getElementById('result').textContent = out + ' ('+toTz+')';
  } catch(e){
    document.getElementById('result').textContent = 'Conversion not supported in this browser.';
  }
}
window.convertTime = convertTime;
