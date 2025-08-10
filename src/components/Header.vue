<script setup>
import { ref } from 'vue'

const props = defineProps({
  activeTab: String,
  interactionCount: Number,
  passageCount: Number,
  uneventfulCount: Number,
  showList: Boolean, // Add this prop
})

// Search form state (keeping your current approach)
const fromDate = ref('')
const toDate = ref('')
const reportId = ref('')

// Emits
const emit = defineEmits(['tab-change', 'show-list', 'hide-list'])

// Tab handler
const selectTab = (tab) => {
  emit('tab-change', tab)
}

const showList = () => {
  emit('show-list')
  console.log('showList')
}

const hideList = () => {
  emit('hide-list')
}
</script>

<template>
  <div class="header-container">
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
        <input 
          class="date-input" 
          type="date" 
          id="from-date" 

        />
        <span class="date-separator">to</span>
        <input 
          class="date-input" 
          type="date" 
          id="to-date" 

        />
      </div>
      <div class="report-id-input">
        <label class="report-id-label" for="report-id">Report ID:</label>
        <input 
          type="text" 
          id="report-id" 
          placeholder="Enter Report ID" 

        />
      </div>
      <button class="show-list-button" @click="showList">
        {{ showList ? 'SHOW LIST' : 'HIDE LIST' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

}

.topbar {
  border-bottom: 2px solid #003366;
  padding-bottom: 10px;
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

.search-controls {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
}

.date-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-input {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.date-separator {
  color: #666;
  font-size: 14px;
}

.report-id-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.report-id-label {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
}

.report-id-input input {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-width: 120px;
}

.show-list-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.show-list-button:hover {
  background-color: #5a6268;
}

.hide-list-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.hide-list-button:hover {
  background-color: #c82333;
}
</style>
