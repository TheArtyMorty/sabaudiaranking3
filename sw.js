if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const d=e=>n(e,o),c={module:{uri:o},exports:t,require:d};i[o]=Promise.all(s.map((e=>c[e]||d(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-oVDFIIwn.css",revision:null},{url:"assets/index-vOHEEIKQ.js",revision:null},{url:"index.html",revision:"2fea2115b37b3633180044c3ed402cdc"},{url:"registerSW.js",revision:"ce023e71941da8390fd7e6887564c364"},{url:"icon.png",revision:"3d22bf73bc52fecb023d04e456de5184"},{url:"icon_192x192.png",revision:"5f0ebb22a2b11a0792b6ce9d942018dd"},{url:"icon_512x512.png",revision:"8a7cc88cd35a83092676cdf1af95d240"},{url:"manifest.webmanifest",revision:"94a64e70ff2d3d473c026967d8a798b2"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
