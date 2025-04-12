const CACHE_NAME = 'ecom-cache-v1';
const urlsToCache = ['/', '/index.html'];

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

self.addEventListener('sync', function (event) {
  if (event.tag === 'sync-cart') {
    console.log('[ServiceWorker] Sync event');
    event.waitUntil(syncCartData());
  }
});

function syncCartData() {
  // Fake sync process
  return new Promise((resolve) => {
    console.log('Syncing cart data...');
    setTimeout(resolve, 2000);
  });
}

self.addEventListener('push', function (event) {
  const payload = event.data.json(); // line 39
  const options = {
    body: data.body || 'Default push message body',
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png'
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'New Notification', options)
  );
});
