<script setup>
import Header from './components/Header.vue';
import ComparativeData from './components/ComparativeData.vue';
import { ref, onMounted, computed} from 'vue';
import { getIncidentSummary, getAllIds} from './api/service'

// Incident/Uneventful ids for counting 
const allIncidents = ref([])
const uneventfulPassages = ref([])

// Button Logic
const activeTab = ref('interactions')
// Button Handler function 
const handleTabChange = (tab) => {
  activeTab.value = tab
}

// Analysis Url/Comparative Data rendered via PHP 
const analysisFrameUrl = computed(() => {
  return `https://www.theca.org.uk/prj/orcasurvey/analysis.php?lang=en`
})
// On mount get all incidents
onMounted(async () => {
  allIncidents.value = await getIncidentSummary()
  const reportIds = await getAllIds()

  uneventfulPassages.value = reportIds.reports.uneventful
  allIncidents.value = reportIds.reports.incident

})




</script>

<template>


  <Header
    :activeTab="activeTab"
    @tab-change="handleTabChange"
    :interactionCount="allIncidents.length"
    :uneventfulCount="uneventfulPassages.length"

  />

  <main>

    <div v-if="activeTab === 'comparative'">

    <ComparativeData :analysisUrl="analysisFrameUrl"/>
    </div>
    <div v-else>
      Hello World
    </div>


</main>
</template>

<style scoped>

</style>
