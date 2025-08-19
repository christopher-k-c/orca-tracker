<script setup>
import { ref, onMounted, onUnmounted, watch} from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster' 
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
let markerClusterGroup = null

const handleIncidentClick = async (id) => {
  const details = await getIncidentDetails(id)
  // console.log("test",details)
  emit('marker-clicked', details)
}

onMounted(async () => {
  if (mapElement.value) {
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

    // Initialize marker cluster group
    markerClusterGroup = new L.MarkerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 50, // Distance in pixels to cluster markers
      spiderfyOnMaxZoom: true, // Spread out markers when max zoom reached
      showCoverageOnHover: true, // Show cluster area on hover
      zoomToBoundsOnClick: true, // Zoom to show all markers in cluster
      iconCreateFunction: function(cluster) {
        const count = cluster.getChildCount()
        let className = 'marker-cluster-'
        
        if (count < 10) {
          className += 'small'
        } else if (count < 100) {
          className += 'medium'
        } else {
          className += 'large'
        }
        
        return L.divIcon({
          html: '<div><span>' + count + '</span></div>',
          className: 'marker-cluster ' + className,
          iconSize: L.point(40, 40)
        })
      }
    })
    
    map.addLayer(markerClusterGroup)
    addMarkersToMap()
  }
})

// Watch for changes in incidents data (when filters change)
watch(() => props.interactionSummary, () => {
  if (map && markerClusterGroup) {
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

    
    const marker = L.marker([incident.lat, incident.long])
      .bindPopup(`<b>Incident ${incident.serial}</b><br>${incident.time}`)

    marker.on('click', () => {

      handleIncidentClick(id)
    })
    

    markerClusterGroup.addLayer(marker)
  })
}

const clearMarkers = () => {
  if (markerClusterGroup) {
    markerClusterGroup.clearLayers()
  }
}

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
  markerClusterGroup = null
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
  overflow: hidden;
  border-radius: 8px;
}

#map-element {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

/* Custom cluster styling */
:deep(.marker-cluster) {
  background: rgba(0, 51, 102, 0.8);
  border: 2px solid #003366;
  border-radius: 50%;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  line-height: 36px;
}

:deep(.marker-cluster-small) {
  background: rgba(0, 51, 102, 0.6);
}

:deep(.marker-cluster-medium) {
  background: rgba(0, 51, 102, 0.8);
}

:deep(.marker-cluster-large) {
  background: rgba(0, 51, 102, 1);
}
</style>
