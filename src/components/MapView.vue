<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {getSummaryData} from '../api/service'

const mapElement = ref(null)
let map = null
const summaryData = ref(null)

onMounted(async () => {
  if (mapElement.value) {

    let response = summaryData.value = await getSummaryData()
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


    Object.values(response.incident).map(marking => {

      L.marker([marking.lat, marking.long])
        .addTo(map)
        .bindPopup(`<b>Incident ${marking.serial}</b><br>${marking.time}`)
        .openPopup()

    })

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
  /* Prevent scrolling */
  overflow: hidden;
}

#map-element {
  height: 100%;
  width: 100%;
  height: 80vh; 
  /* Prevent scrolling */
  overflow: hidden;
}
</style>
