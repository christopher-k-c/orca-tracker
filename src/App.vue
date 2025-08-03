<script setup>
import Header from './components/Header.vue';
import { ref, onMounted} from 'vue';
import { getIncidentSummary } from './api/service'


const allIncidents = ref([])



// Button Logic
const activeTab = ref('interactions')
// Handler
const handleTabChange = (tab) => {
  activeTab.value = tab
}


// On mount get all incidents
onMounted(async () => {
  allIncidents.value = await getIncidentSummary()
  

})







</script>

<template>

  <Header
  :activeTab="activeTab"
  @tab-change="handleTabChange"
  :interactionCount="allIncidents.length"
/>





</template>

<style scoped>


</style>
