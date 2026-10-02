const CACHE="gastos-v3-v1";
const FILES_TO_CACHE=["./","./index.html","./manifest.json"];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>{if(k!==CACHE)return caches.delete(k)}))));
});
self.addEventListener('fetch',e=>{
  e.respondWith(caches.match(e.request).then(res=>res||fetch(e.request)));
});
