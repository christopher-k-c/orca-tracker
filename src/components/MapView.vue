<script setup>
import { ref, onMounted, onUnmounted, watch} from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {getIncidentDetails} from '../api/service'

const props = defineProps({
  interactionSummary: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['marker-clicked'])


const mapElement = ref(null)
let map = null
let markers = []


const handleIncidentClick = async (id) => {
  const details = await getIncidentDetails(id)
  console.log("test",details)
  // if (details.status === 'OK') {
    emit('marker-clicked', details)
  // }
}



onMounted(async () => {
  if (mapElement.value) {

    // let response = summaryData.value = await getSummaryData()
    // Create map centered around Gibraltar area
    map = L.map(mapElement.value).setView([36.15, -6.03], 8)

    // OpenStreetMap base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // OpenSeaMap seamark overlay
    L.tileLayer("https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png", {
      attribution: 'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
    }).addTo(map)

    addMarkersToMap()
  }
})

// Watch for changes in incidents data (when filters change)
watch(() => props.interactionSummary, () => {
  if (map) {
    clearMarkers()
    addMarkersToMap()
    
  }
}, { deep: true })

const addMarkersToMap = () => {
  if (!props.interactionSummary || Object.keys(props.interactionSummary).length === 0) {
    const noResultsDiv = document.createElement('div')
    noResultsDiv.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">No incidents found for selected criteria</div>'
    map.getContainer().appendChild(noResultsDiv)
    return
  }


  Object.entries(props.interactionSummary).forEach(([id, incident]) => {
    console.log('Creating marker for ID:', id, 'Incident:', incident)
    
    const marker = L.marker([incident.lat, incident.long])
      .addTo(map)
      .bindPopup(`<b>Incident ${incident.serial}</b><br>${incident.time}`)
    

    marker.on('click', () => {
      console.log('Marker clicked - ID:', id, 'Incident:', incident)
      // emit('marker-clicked', { id, ...incident })
      handleIncidentClick(id)


    })
    
    markers.push(marker)
  })
}

const clearMarkers = () => {
  markers.forEach(marker => {
    map.removeLayer(marker)
  })
  markers = []
}

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
  overflow: hidden;
}

#map-element {
  height: 100%;
  width: 100%;
  height: 80vh; 
  overflow: hidden;
}
</style>
