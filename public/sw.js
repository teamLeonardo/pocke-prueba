const POKEMON_IMAGE_CACHE = 'pokemon-images-v1';

// Estrategia Cache First para imágenes de Pokémon
const cachePokemonImage = async (request) => {
  const cache = await caches.open(POKEMON_IMAGE_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Error al cargar la imagen:', error);
    // Si falla la red y no hay caché, devolver una imagen por defecto
    return cache.match('/images/pokemon-placeholder.png');
  }
};

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(POKEMON_IMAGE_CACHE)
  );
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== POKEMON_IMAGE_CACHE)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Interceptación de peticiones
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Solo cachear imágenes de Pokémon
  if (url.pathname.includes('/pokemon/other/dream-world/')) {
    event.respondWith(cachePokemonImage(event.request));
  }
});

// Manejo de mensajes para actualización de caché
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 