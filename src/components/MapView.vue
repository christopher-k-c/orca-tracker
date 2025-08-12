<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapElement = ref(null)
let map = null

onMounted(() => {
  if (mapElement.value) {
    // Create map centered around Gibraltar area
    map = L.map(mapElement.value).setView([36.15, -6.03], 8)

    // Add OpenStreetMap base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // Add OpenSeaMap seamark overlay
    L.tileLayer("https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png", {
      attribution: 'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
    }).addTo(map)

    // Test marker for incident 
    const incident = {
      lat: 36.15,
      long: -6.033333333333333,
      serial: "1",
      time: "2022-06-09 04:45:00"
    }

    L.marker([incident.lat, incident.long])
      .addTo(map)
      .bindPopup(`<b>Incident ${incident.serial}</b><br>${incident.time}`)
      .openPopup()
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div class="map-view-container">
    <div id="map-element" ref="mapElement"></div>
  </div>
</template>

<style scoped>
.map-view-container {
  height: 100%;
  width: 100%;
  position: relative;
  height: 80vh; 
}

#map-element {
  height: 100%;
  width: 100%;
  height: 80vh; 
}
</style>
