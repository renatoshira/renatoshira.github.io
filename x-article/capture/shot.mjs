// uso: node cdp.mjs <url> <largura> <script.json>
// script: [{eval:"js"}, {shot:"nome", sel:"#w5"|null, full:false}, {wait:ms}]
import {spawn} from 'child_process';
import fs from 'fs';
const [url,width,scriptFile]=process.argv.slice(2);
const steps=JSON.parse(fs.readFileSync(scriptFile,'utf8'));
const port=9333+Math.floor(Math.random()*500);
const chrome=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--remote-debugging-port='+port,'--user-data-dir=/tmp/cdp-'+port,'--hide-scrollbars','--window-size='+width+',900','about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws;for(let i=0;i<50;i++){try{const t=await (await fetch(`http://127.0.0.1:${port}/json`)).json();const p=t.find(x=>x.type==='page');if(p){ws=new WebSocket(p.webSocketDebuggerUrl);break}}catch(e){}await sleep(200)}
await new Promise(r=>ws.onopen=r);
let id=0;const pend={};const errors=[];
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pend[m.id]){pend[m.id](m);delete pend[m.id]}
 if(m.method==='Runtime.exceptionThrown')errors.push('EXC '+(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text));
 if(m.method==='Log.entryAdded'&&m.params.entry.level==='error')errors.push('LOG '+m.params.entry.text+' '+(m.params.entry.url||''));
 if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')errors.push('CON '+m.params.args.map(a=>a.value||a.description).join(' '))};
const send=(method,params={})=>new Promise(r=>{const i=++id;pend[i]=r;ws.send(JSON.stringify({id:i,method,params}))});
await send('Runtime.enable');await send('Log.enable');await send('Page.enable');
const mobile=+width<600;
await send('Emulation.setDeviceMetricsOverride',{width:+width,height:720,deviceScaleFactor:2,mobile});
await send('Page.navigate',{url});await sleep(2500);
for(const st of steps){
  if(st.wait)await sleep(st.wait);
  if(st.eval){const r=await send('Runtime.evaluate',{expression:st.eval,awaitPromise:true,returnByValue:true});console.log('EVAL',JSON.stringify(r.result.result?.value ?? r.result.exceptionDetails?.exception?.description).slice(0,1500))}
  if(st.shot){let clip;
    if(st.sel){const r=await send('Runtime.evaluate',{expression:`(()=>{const e=document.querySelector(${JSON.stringify(st.sel)});e.scrollIntoView({block:'start'});const b=e.getBoundingClientRect();return {x:b.left+scrollX,y:b.top+scrollY,w:b.width,h:b.height}})()`,returnByValue:true});const b=r.result.result.value;await sleep(st.delay||600);clip={x:Math.max(0,b.x-8),y:Math.max(0,b.y-8),width:b.w+16,height:Math.min(b.h+16,4000),scale:1}}
    const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,...(clip?{clip}:{})});
    fs.writeFileSync(st.shot,Buffer.from(r.result.data,'base64'));console.log('SHOT',st.shot)}
}
console.log('ERRORS',errors.length?errors.join('\n'):'none');
ws.close();chrome.kill();process.exit(0);
