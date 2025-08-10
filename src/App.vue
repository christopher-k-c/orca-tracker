<script setup>
import Header from './components/Header.vue';
import ComparativeData from './components/ComparativeData.vue';
import { ref, onMounted, computed } from 'vue';
import { getIncidentSummary, getAllIds} from './api/service'
import InteractionsList from './components/InteractionsList.vue'
import DetailsPanel from './components/DetailsPanel.vue';

// Incident/Uneventful ids for counting 
const allIncidents = ref({})
const uneventfulPassages = ref([])
const showList = ref(false)

// Interaction List Element State
const selectedIncident = ref(null)

const handleSelectedIncident = (emittedIncident) => {
  selectedIncident.value = emittedIncident
}

// Button Logic
const activeTab = ref('interactions')

// Button Handler function 
const handleTabChange = (tab) => {
  activeTab.value = tab
}

const handleShowList = () => {
  console.log('toggle list')
  showList.value = !showList.value // Toggle between true/false
}

// Analysis Url/Comparative Data rendered via PHP 
const analysisFrameUrl = computed(() => {
  return `https://www.theca.org.uk/prj/orcasurvey/analysis.php?lang=en`
})

// On mount get all incidents
onMounted(async () => {
  try {
    // console.log('Starting data fetch...')
    
    // Get incidents from service (returns object)
    allIncidents.value = await getIncidentSummary()
    console.log('All Incidents:', allIncidents.value)
    console.log('Incidents count:', Object.keys(allIncidents.value).length)
    
    // Get uneventful passages
    const reportIds = await getAllIds()
    console.log('Report IDs:', reportIds)
    uneventfulPassages.value = reportIds.reports.uneventful || []
    console.log('Uneventful passages:', uneventfulPassages.value)
  } catch (error) {
    console.error('Error loading data:', error)
  }
})
</script>

  <template>
    <div id="app-layout">
      <Header
        :activeTab="activeTab"
        @tab-change="handleTabChange"
        @show-list="handleShowList"

        :showList="showList"
        :interactionCount="Object.keys(allIncidents).length"
        :uneventfulCount="uneventfulPassages.length"
      />

      <main class="main-content">
        <div class="content-area">
          <InteractionsList v-if="showList" :interactionSummary="allIncidents" @selected-incident="handleSelectedIncident"/>

          <div v-else-if="activeTab === 'comparative'">
            <ComparativeData :analysisUrl="analysisFrameUrl"/>
          </div>
          <div v-else>
            <h2>{{ activeTab === 'interactions' ? 'Orca Interactions' : 'Uneventful Passages' }}</h2>
            <p>Click "SHOW LIST" to view interactions</p>
          </div>
        </div>

        <div class="details-panel-container">
          <DetailsPanel :incident="selectedIncident"/>
        </div>
      </main>
    </div>
  </template>

<style scoped>

#app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
}

 .main-content {
   display: flex;
   flex-grow: 1;
   overflow: hidden;
  
 }

 .content-area {
   flex: 1;
   overflow-y: auto;
   padding: 20px;
 }

 .details-panel-container {
   width: 500px;
   /* min-width: 250px; */
   /* max-width: 500px; */
   background-color: #fff;
   border-left: 1px solid #e0e0e0;
   box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
   overflow-y: auto;
 }
</style>
