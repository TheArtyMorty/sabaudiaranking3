if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const d=e=>n(e,o),c={module:{uri:o},exports:t,require:d};i[o]=Promise.all(s.map((e=>c[e]||d(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-t9_ieXKK.css",revision:null},{url:"assets/index-TIYw0irg.js",revision:null},{url:"index.html",revision:"a3498040e15a962e8e40ee5eb7066ad4"},{url:"registerSW.js",revision:"ce023e71941da8390fd7e6887564c364"},{url:"icon.png",revision:"5da86ced56a75812846871ad409d7492"},{url:"icon_192x192.png",revision:"c255c112d1904a6e850888c9fd70576f"},{url:"icon_512x512.png",revision:"8252b68a237f6c83d9cb1961ecb90563"},{url:"manifest.webmanifest",revision:"94a64e70ff2d3d473c026967d8a798b2"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
