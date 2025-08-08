<script setup>
import { ref } from 'vue'

const props = defineProps({
  activeTab: String,
  interactionCount: Number,
  passageCount: Number,
  uneventfulCount: Number,

})

const fromDate = ref('')
const toDate = ref('')
const reportId = ref('')

// Emits
const emit = defineEmits(['tab-change'])

// Handler
const selectTab = (tab) => {
  emit('tab-change', tab)
}


</script>

<template>


<container class="header-container">  
  <div class="topbar">
    <!-- Tab Buttons -->
    <nav class="tab-buttons">
      <button 
      :class="['tab-button', { 'active': activeTab === 'interactions' }]"
      @click="selectTab('interactions')"
      >
        Orca interactions ({{ interactionCount }})
      </button>
      <button
        :class="['tab-button', { 'active': activeTab === 'passages' }]"
        @click="selectTab('passages')"
      >
        Uneventful passages ({{ uneventfulCount }})
      </button>
      <button
        :class="['tab-button', { 'active': activeTab === 'comparative' }]"
        @click="selectTab('comparative')"
      >
        Comparative Data 
      </button>
    </nav>
  </div>

  <!-- Search Field -->
  <div class="search-controls">
    <div class="date-inputs">
      <input class="date-input" type="date" id="from-date" v-model="fromDate" @change="performSearch" />
      <span class="date-input">to</span>
      <input class="date-input" type="date" id="to-date" v-model="toDate" @change="performSearch" />
    </div>
    <div class="report-id-input">
        <label class="report-id" for="report-id">Report ID:</label>
        <input 
          type="text" 
          id="report-id" 
          placeholder="Enter Report ID" 
          v-model="reportId"
          @input="performReportSearch"
        />
      </div>
  </div>

</container>




</template>

<style scoped>

.header-container{
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.topbar {
  border-bottom: 2px solid #003366;
  padding-bottom: -8px;
}


.tab-button {
  background-color: #555;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px 4px 0 0;
  margin-right: 5px;
  transition: background-color 0.3s ease;
}

.tab-button.active {
  background-color: #007bff;
  font-weight: bold;
}

.search-controls{
  display: flex;
  justify-content:start;
  flex-wrap: wrap;

}

.date-inputs{
  margin: 10px 10px 0 0;
}

.report-id-input{
  padding: 10px 10px 0 0;
}

</style>
