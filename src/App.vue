<script setup>
import Header from './components/Header.vue';
import ComparativeData from './components/ComparativeData.vue';
import { ref, onMounted } from 'vue';
import { getSummaryData, getAllIds, getUneventfulPassages, getAllDetails} from './api/service'
import InteractionsList from './components/InteractionsList.vue'
import DetailsPanel from './components/DetailsPanel.vue';
import MapView from './components/MapView.vue';
import PassageList from './components/PassageList.vue';

// Incident/Uneventful ids for counting 
const allIncidents = ref({})
const uneventfulPassages = ref({})
const showList = ref(false)

// Interaction List Element State
const selectedIncident = ref(null)

// Passage List Element State
const selectedPassage = ref(null)

// Comparative Data Element State
const analysisFrameUrl = ref(null)
const handleSelectedPassage = (emittedPassage) => {
  selectedPassage.value = emittedPassage
  // Clear any selected incident when selecting a passage
  selectedIncident.value = null
}

const handleSelectedIncident = (emittedIncident) => {
  selectedIncident.value = emittedIncident
  selectedPassage.value = null
}

// Button Logic
const activeTab = ref('interactions')

// Button Handler function 
const handleTabChange = (tab) => {
  if (activeTab.value !== tab) {
    showList.value = false
    selectedIncident.value = null
    selectedPassage.value = null 
    activeTab.value = tab
  }
}

const handleShowList = () => {
  console.log('toggle list')
  showList.value = !showList.value // Toggle between true/false
}

const urlFunc = () => {
  analysisFrameUrl.value = `https://www.theca.org.uk/prj/orcasurvey/analysis.php?lang=en`
}

// Analysis Url/Comparative Data rendered via PHP 
// const analysisFrameUrl = computed(() => {
//   return `https://www.theca.org.uk/prj/orcasurvey/analysis.php?lang=en`
// })

// On mount get all incidents
onMounted(async () => {
  try {
    urlFunc()
  
    let reportData = await getSummaryData()

    uneventfulPassages.value = reportData.uneventful
    allIncidents.value = reportData.incident
    // console.log(reportData)

    // let test = await getAllDetails(13707)
    // let testtwo = await getAllDetails(8709)
    
    
    // console.log(test)
    // console.log(testtwo)

  } catch (error) {
    console.error('Error loading data:', error)
  }
})
</script>

  <template>
    <div id="app-layout">
      <div class="app-container">
        <!-- App navigation bar, includes date inputs, search bar and list button --> 
      <Header
        class="header-container"
        :activeTab="activeTab"
        @tab-change="handleTabChange"
        @show-list="handleShowList"
        :showList="showList"
        :interactionCount="Object.keys(allIncidents).length"
        :uneventfulCount="Object.keys(uneventfulPassages).length"
      />

      <main class="main-content">
        <div class="content-area">

            <InteractionsList v-if="showList" 
              :interactionSummary="allIncidents" 
              @selected-incident="handleSelectedIncident"
            />

            <PassageList v-else-if="activeTab === 'passages'" 
              :passageSummary="uneventfulPassages"
              @selected-passage="handleSelectedPassage"
            />

            <ComparativeData v-else-if="activeTab === 'comparative'" 
              :analysisUrl="analysisFrameUrl"
            />

            <MapView v-else 
              class="map-view-container"
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
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
}

.app-container{

  max-width: 100%;
  margin: 0 auto;
  padding: 20px 20px;
  box-sizing: border-box;
}

 .main-content {
   display: flex;
   flex-grow: 1;
   overflow: hidden;
  
 }

 .content-area {
   flex: 1;
   overflow-y: auto;
   padding: 0px 20px 20px 0px;
 }


 .details-panel-container {
   width: 500px;
   /* min-width: 250px; */
   /* max-width: 500px; */
   background-color: #fff;
   border-left: 1px solid #e0e0e0;
   box-shadow: -4px 2px 2px rgba(0, 0, 0, 0.1);
   border-radius: 8px;
   /* overflow-y: auto; */
 }
</style>
