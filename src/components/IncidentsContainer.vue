


<script setup>
import { ref } from 'vue' 
import MapView from './MapView.vue'
import MapInputs from './MapInputs.vue'
import IncidentsList from './IncidentsList.vue'

const props = defineProps({
    interactionSummary: Object, // Add this prop
})

// Manage showList state local to Interactions Container 
const showList = ref(false)

const handleShowList = () => {
  console.log('toggle list')
  showList.value = !showList.value // Toggle between true/false
}

const emit = defineEmits(['selected-incident']) // Add this emit

const handleSelectedIncident = (incident) => {
  emit('selected-incident', incident)
}

</script>


<template>
    <div class="map-container">
        <!-- MapInputs always shows -->
        <MapInputs 
            @show-list="handleShowList"
            :showList="showList"
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
            :incidents="interactionSummary"
        />
    </div>
</template>

<style scoped>

.map-container {
  height: 100%;
  width: 100%;
  position: relative;
  /* Prevent scrolling */
  overflow: hidden;
}

</style>