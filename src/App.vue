<script setup>
import Header from './components/Header.vue';
import { ref, onMounted} from 'vue';
import { getIncidentSummary, getUneventfulPassages } from './api/service'

// Incident/Uneventful ids for counting 
const allIncidents = ref([])
const uneventfulPassages = ref([])

// Button Logic
const activeTab = ref('interactions')
// Button Handler function 
const handleTabChange = (tab) => {
  activeTab.value = tab
}

// On mount get all incidents
onMounted(async () => {
  allIncidents.value = await getIncidentSummary()
  uneventfulPassages.value = await getUneventfulPassages()
})


</script>

<template>


  <Header
    :activeTab="activeTab"
    @tab-change="handleTabChange"
    :interactionCount="allIncidents.length"
    :uneventfulCount="uneventfulPassages.length"

  />
</template>

<style scoped>

</style>
