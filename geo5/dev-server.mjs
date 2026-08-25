import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import worker from './src/index.js';
const root=path.resolve('./public');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json; charset=utf-8','.png':'image/png'};
async function assetFetch(req){const u=new URL(req.url);let p=u.pathname;if(p==='/')p='/index.html';const file=path.join(root,p.replace(/^\//,''));try{const b=await fs.readFile(file);return new Response(b,{status:200,headers:{'content-type':types[path.extname(file)]||'application/octet-stream'}})}catch{return new Response('Not found',{status:404})}}
const env={ASSETS:{fetch:assetFetch}};
const server=http.createServer(async(req,res)=>{const url=`http://127.0.0.1:8787${req.url}`;const chunks=[];for await(const c of req)chunks.push(c);const init={method:req.method,headers:req.headers};if(!['GET','HEAD'].includes(req.method))init.body=Buffer.concat(chunks);const r=await worker.fetch(new Request(url,init),env);res.statusCode=r.status;for(const[k,v]of r.headers)res.setHeader(k,v);res.end(Buffer.from(await r.arrayBuffer()))});
server.listen(8787,'127.0.0.1',()=>console.log('Geo5 dev server http://127.0.0.1:8787'));
