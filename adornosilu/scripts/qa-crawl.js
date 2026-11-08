/* eslint-disable */
const { chromium, devices } = require('playwright');
const B=process.env.QA_URL||'http://localhost:3100';
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices['iPhone 13'] });
  const p = await ctx.newPage();
  const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  // rastrear todos los enlaces internos
  const seen=new Set(), queue=['/'], bad=[], issues=[];
  while(queue.length){const u=queue.shift(); if(seen.has(u))continue; seen.add(u);
    const r=await p.goto(B+u,{waitUntil:'networkidle'}); if(!r||r.status()!==200){bad.push([u,r&&r.status()]);continue;}
    const info=await p.evaluate(()=>({h:document.documentElement.scrollWidth>innerWidth, t:document.title, d:document.querySelector('meta[name=description]')?.content||'', h1:document.querySelectorAll('h1').length, canon:document.querySelector('link[rel=canonical]')?.href, brokenImg:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src), noalt:[...document.images].filter(i=>!i.alt).length, links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))}));
    if(info.h)issues.push([u,'scroll lateral']); if(info.h1!==1)issues.push([u,'h1='+info.h1]); if(!info.d)issues.push([u,'sin description']); if(info.d.length>160)issues.push([u,'description '+info.d.length]); if(info.t.length>65)issues.push([u,'title '+info.t.length+' '+info.t]); if(!info.canon)issues.push([u,'sin canonical']); if(info.brokenImg.length)issues.push([u,'img rota',info.brokenImg]); if(info.noalt)issues.push([u,'img sin alt '+info.noalt]);
    for(const l of info.links){ if(l.startsWith('/')&&!l.startsWith('//')){const x=l.split('#')[0]; if(x&&!seen.has(x))queue.push(x);} }
  }
  console.log('paginas',seen.size); console.log('rotas',bad); console.log('issues',issues); console.log('js errors',errs);
  // redirecciones WP
  for(const u of ['/product/guirnaldas-flexible/','/product/pino-monterrey-pm/','/productos/','/product-category/pinos-navidenos/','/home/']){const r=await p.request.get(B+u,{maxRedirects:0}); console.log('redir',u,r.status(),r.headers()['location']);}
  // enlaces externos
  
  await b.close();
})();
