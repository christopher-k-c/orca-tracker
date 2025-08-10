<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapElement = ref(null)
let map = null

onMounted(() => {
  if (mapElement.value) {
    // Center map around Gibraltar area
    map = L.map(mapElement.value).setView([36.15, -6.03], 8)

    // Add OpenStreetMap base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // Add OpenSeaMap seamark overlay
    L.tileLayer("https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png", {
      attribution: 'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
    }).addTo(map)
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
  /* min-height: 500px; Ensure minimum height */
  height: 80vh; 
}

#map-element {
  height: 100%;
  width: 100%;
  /* min-height: 500px; Ensure minimum height */
  height: 80vh; 
}
</style> 