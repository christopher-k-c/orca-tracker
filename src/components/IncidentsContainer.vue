


<script setup>
import { ref } from 'vue' 
import MapView from './MapView.vue'
import MapInputs from './MapInputs.vue'
import IncidentsList from './IncidentsList.vue'

const props = defineProps({
    interactionSummary: Object,
    dateFilters:{
      type: Object,
      default: () => ({})
    }
})

let test = Object.values(props.interactionSummary)
console.log(test)

// Manage showList state local to Interactions Container 
const showList = ref(false)

const handleShowList = () => {
  showList.value = !showList.value 
}

const emit = defineEmits(['selected-incident', 'date-filter-update', 'clear-filters']) 

const handleSelectedIncident = (incident) => {
  emit('selected-incident', incident)
}

const handleDateFilterUpdate = (filters) => {
  emit('date-filter-update', filters)
}


const handleMarkerClicked = (incidentData) => {
  emit('selected-incident', incidentData)
}

const handleClearFilters = () => {
  emit('clear-filters')
}

</script>


<template>
    <div class="map-container">
        <!-- MapInputs always shows -->
        <MapInputs 
            @show-list="handleShowList"
            :showList="showList"
            :dateFilters="dateFilters"
            @date-filter-update="handleDateFilterUpdate"
            @clear-filters="handleClearFilters"
        />
        
        <!-- IncidentsList shows when showList is true -->
        <IncidentsList 
            v-show="showList"
            :interactionSummary="interactionSummary"
            @selected-incident="handleSelectedIncident"
        />
        
        <!-- MapView shows when showList is false -->
        <MapView 
            v-show="!showList"
            :interactionSummary="interactionSummary"
            @marker-clicked="handleMarkerClicked"
        />
    </div>
</template>

<style scoped>

.map-container {
  height: 100%;
  width: 100%;
  position: relative;

  overflow: hidden;
}

</style>