<script setup>
import Header from './components/Header.vue';
import ComparativeData from './components/ComparativeData.vue';
import { ref, onMounted, computed } from 'vue';
import { getSummaryData} from './api/service'
import DetailsPanel from './components/DetailsPanel.vue';
import PassageList from './components/PassageList.vue';
import IncidentsContainer from './components/IncidentsContainer.vue';
import { useIncidentFiltering } from './composables/filtering'




// Incident/Uneventful ids for counting 
const allIncidents = ref({})
const uneventfulPassages = ref({})

// Interaction List Element State
const selectedIncident = ref(null)

// Passage List Element State
const selectedPassage = ref(null)

// Comparative Data Element State
const analysisFrameUrl = ref(null)

// Button Logic
const activeTab = ref('interactions')

// Date & Report ID Filters
const dateFilters = ref({
  fromDate: '',
  toDate: '',
  reportId: ''
})

// Composable for filtering incidents, takes the allIncidents and dateFilters as arguments
const { filteredIncidents } = useIncidentFiltering(allIncidents, dateFilters)
// console.log(filteredIncidents)

const handleSelectedPassage = (emittedPassage) => {
  selectedPassage.value = emittedPassage
  // Clear any selected incident when selecting a passage
  selectedIncident.value = null
}

const handleSelectedIncident = (emittedIncident) => {

  // console.log(emittedIncident)
  selectedIncident.value = emittedIncident
  // Clear any selected Passage when selecting an Incident
  selectedPassage.value = null
}

// Button Handler function 
const handleTabChange = (tab) => {
  if (activeTab.value !== tab) {
    selectedIncident.value = null
    selectedPassage.value = null 
    activeTab.value = tab
  }
}

// Date Filter Handler function 
const handleDateFilterUpdate = (filters) => {
  dateFilters.value = { ...filters }

}

const handleClearFilters = () => {
  dateFilters.value = {
    fromDate: '',
    toDate: '',
    reportId: ''
  }
}

// On mount get all incidents
onMounted(async () => {
  try {
    let reportData = await getSummaryData()
    uneventfulPassages.value = reportData.uneventful
    allIncidents.value = reportData.incident
    analysisFrameUrl.value = `https://www.theca.org.uk/prj/orcasurvey/analysis.php?lang=en`
  } catch (error) {

  }
})
</script>

  <template>
    <div id="app-layout">

      <div class="app-container">

        <Header
        class="header-container"
        :activeTab="activeTab"
        @tab-change="handleTabChange"
        :interactionCount="Object.keys(allIncidents).length"
        :uneventfulCount="Object.keys(uneventfulPassages).length"
      />
        <main class="main-content">

          <div class="content-area">
            <IncidentsContainer v-show="activeTab === 'interactions'" 
              :interactionSummary="filteredIncidents"
              :activeTab="activeTab"
              :dateFilters="dateFilters"
              @selected-incident="handleSelectedIncident"
              @date-filter-update="handleDateFilterUpdate"
              @clear-filters="handleClearFilters"
            />

            <PassageList v-show="activeTab === 'passages'" 
              :passageSummary="uneventfulPassages"
              @selected-passage="handleSelectedPassage"
            />

            <ComparativeData v-show="activeTab === 'comparative'" 
              :analysisUrl="analysisFrameUrl"
            />

          </div>
        
          <div class="details-panel-container">

            <DetailsPanel 
              :incident="selectedIncident"
              :passage="selectedPassage"  
              :activeTab="activeTab"   
            />
          </div>
        </main>
      </div>
    </div>
  </template>

<style scoped>

#app-layout {

  font-family: Arial, sans-serif;


  display: grid;
  grid-template-rows: auto 1fr; 
  grid-template-columns: 2fr 1fr;
  /* min-height: 100vh;  */
  gap: 1rem; /* Optional spacing */

  /* font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f0f2f5;
  border-radius: 8px;
  padding: 20px; */
}

.app-container{
  grid-column: 1 / -1;


}

 .main-content {

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  min-height: 0;
/* 
   display: flex;
   flex-grow: 1;
   overflow: hidden; */
   /* overflow: hidden; */
  
 }

 .content-area {

  /* overflow-y: auto;  */
  min-height: 0; /* Prevents grid items from growing beyond container */
   
  /* flex: 1;
   overflow: hidden;
   padding: 0px 20px 0px 0px; */
   /* border-radius: 8px; */
 }




 .details-panel-container {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;

   /* width: 500px;
   height: 100%;


   border-radius: 8px; */


      /* box-shadow: -4px 2px 2px rgba(0, 0, 0, 0.1); */
 }


 @media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr; /* Single column */
    grid-template-rows: 1fr 1fr; /* Stack vertically */
  }
}
</style>
