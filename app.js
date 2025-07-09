// ===== 1. Configuración inicial =====
const map = L.map('map').setView([-34.6037, -58.3816], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
const marker = L.marker([-34.6037, -58.3816]).addTo(map);

// ===== 2. Pedir permisos para notificaciones =====
function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.error('Este navegador no soporta notificaciones');
    return;
  }

  Notification.requestPermission().then(permission => {
    console.log('Estado de permisos:', permission);
    if (permission === 'granted') {
      mostrarNotificacionEjemplo();
    }
  });
}

function mostrarNotificacionEjemplo() {
  if (Notification.permission === 'granted') {
    new Notification('¡Listo!', {
      body: 'Recibirás alertas del ajustador',
      icon: 'https://cdn-icons-png.flaticon.com/512/149/149060.png'
    });
  }
}

// ===== 3. Conexión WebSocket =====
const socket = io("https://tu-backend-en-render.onrender.com"); // ¡Cambia esta URL!

socket.on('connect', () => {
  console.log('✅ Conectado al servidor');
  requestNotificationPermission(); // Pedir permisos al conectar
});

socket.on('nueva-ubicacion', (data) => {
  const { lat, lng, id } = data;
  marker.setLatLng([lat, lng]);
  map.panTo([lat, lng]);
  
  if (Notification.permission === 'granted') {
    new Notification(`Ajustador ${id} actualizado`, {
      body: `Ubicación: ${lat.toFixed(5)}, ${lng.toFixed(5)}`,
      icon: 'https://cdn-icons-png.flaticon.com/512/149/149060.png'
    });
  }
});

// ===== 4. Registrar Service Worker =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registrado:', reg.scope))
      .catch(err => console.error('Error SW:', err));
  });
}
