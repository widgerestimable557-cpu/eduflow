const CACHE_NAME = 'eduflow-v2';
const urlsToCache = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// ✅ Réception notification push
self.addEventListener('push', event => {
  let data = {
    title: 'EduFlow',
    body: 'Nouvelle mise à jour disponible',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    url: '/'
  };

  if (event.data) {
    try { data = { ...data, ...event.data.json() }; }
    catch (e) { data.body = event.data.text(); }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge,
      vibrate: [200, 100, 200],
      data: { url: data.url },
      actions: [
        { action: 'open', title: '👁️ Voir' },
        { action: 'close', title: '✕ Fermer' }
      ]
    })
  );
});

// ✅ Clic sur la notification
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'close') return;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      return clients.openWindow(event.notification.data.url || '/');
    })
  );
});
