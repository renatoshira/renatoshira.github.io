// grava a página com CDP screencast e gera MP4 30fps via ffmpeg
// uso: node record.mjs <url> <segundos> <saida.mp4> [jsAntes]
import {spawn,execFileSync} from 'child_process';import fs from 'fs';import path from 'path';
const [url,secs,out,pre]=process.argv.slice(2);
const port=9800+Math.floor(Math.random()*150);
const ch=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--remote-debugging-port='+port,'--user-data-dir=/tmp/rec-'+port,'--hide-scrollbars','--window-size=1280,720','about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws;for(let i=0;i<50;i++){try{const t=await (await fetch(`http://127.0.0.1:${port}/json`)).json();const p=t.find(x=>x.type==='page');if(p){ws=new WebSocket(p.webSocketDebuggerUrl);break}}catch(e){}await sleep(200)}
await new Promise(r=>ws.onopen=r);
let id=0;const pend={};const frames=[];let rec=false;const dir=fs.mkdtempSync('/tmp/frames-');
const send=(m,p={})=>new Promise(r=>{const i=++id;pend[i]=r;ws.send(JSON.stringify({id:i,method:m,params:p}))});
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pend[m.id]){pend[m.id](m);delete pend[m.id]}
 if(m.method==='Page.screencastFrame'){send('Page.screencastFrameAck',{sessionId:m.params.sessionId});if(rec){const n=frames.length;const fn=path.join(dir,String(n).padStart(5,'0')+'.jpg');fs.writeFileSync(fn,Buffer.from(m.params.data,'base64'));frames.push({fn,t:m.params.metadata.timestamp})}}};
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride',{width:1280,height:720,deviceScaleFactor:1.5,mobile:false});
await send('Page.navigate',{url});await sleep(2500);
if(pre){await send('Runtime.evaluate',{expression:pre});await sleep(800)}
await send('Page.startScreencast',{format:'jpeg',quality:92,maxWidth:1920,maxHeight:1080,everyNthFrame:1});
await sleep(600);rec=true;await sleep(+secs*1000);rec=false;await send('Page.stopScreencast');
ws.close();ch.kill();
// lista concat com durações reais
let txt='';for(let i=0;i<frames.length;i++){const d=i<frames.length-1?frames[i+1].t-frames[i].t:1/30;txt+=`file '${frames[i].fn}'\nduration ${d.toFixed(4)}\n`}
txt+=`file '${frames[frames.length-1].fn}'\n`;fs.writeFileSync(path.join(dir,'list.txt'),txt);
execFileSync('ffmpeg',['-y','-loglevel','error','-f','concat','-safe','0','-i',path.join(dir,'list.txt'),'-vf','fps=30,scale=1920:1080:flags=lanczos,format=yuv420p','-c:v','libx264','-preset','slow','-crf','20','-movflags','+faststart',out]);
console.log('frames',frames.length,'->',out);
