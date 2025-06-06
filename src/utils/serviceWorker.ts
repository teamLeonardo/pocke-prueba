export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
      // console.log('Service Worker registrado para caché de imágenes de Pokémon');
    } catch (error) {
      console.error('Error al registrar el Service Worker:', error);
    }
  }
}; 