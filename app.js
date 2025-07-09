<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>

<script src="app.js" defer></script>
// Configurar mapa
const map = L.map('map').setView([-34.6037, -58.3816], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
const marker = L.marker([-34.6037, -58.3816]).addTo(map);

// Conectar al backend en Render (cambia la URL por la tuya)
const socket = io("https://pwa-ajustador-backend.onrender.com");

// Escuchar actualizaciones
socket.on("nueva-ubicacion", (data) => {
  const { lat, lng, id } = data;
  marker.setLatLng([lat, lng]);
  map.panTo([lat, lng]);

  // Notificación
  if (Notification.permission === "granted") {
    new Notification(`Ajustador ${id} actualizado`, {
      body: `Nueva ubicación: ${lat.toFixed(5)}, ${lng.toFixed(5)}`
    });
  }
});

// Pedir permiso para notificaciones
if ("Notification" in window) {
  Notification.requestPermission();
}
