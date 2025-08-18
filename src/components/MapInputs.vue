

<script setup>
import {ref, watch, computed} from 'vue'

const props = defineProps({
  showList: Boolean,
  dateFilters: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['show-list', 'date-filter-update', 'clear-filters'])

const handleShowList = () => {
  emit('show-list')
  // console.log('showList')
}

// Local state for inputs
const localFilters = ref({
  fromDate: '',
  toDate: '',
  reportId: ''
})

// Watch for prop changes and sync local state
watch(() => props.dateFilters, (newFilters) => {
  localFilters.value = { ...newFilters }
}, { deep: true, immediate: true })

// Handle date changes
const handleFromDateChange = (event) => {
  localFilters.value.fromDate = event.target.value
  updateFilters()
}

const handleToDateChange = (event) => {
  localFilters.value.toDate = event.target.value
  updateFilters()
}

const handleReportIdChange = (event) => {
  localFilters.value.reportId = event.target.value
  updateFilters()
}

// Update filters and emit to parent
const updateFilters = () => {
  emit('date-filter-update', localFilters.value)
}

const hasActiveFilters = computed(() => {
  return props.dateFilters.fromDate || 
         props.dateFilters.toDate || 
         props.dateFilters.reportId
})


const clearFilters = () => {
  emit('clear-filters')
}
</script>

<template> 
  <!-- Search Field -->
  <div class="search-controls">
  <div class="date-inputs">
    <input 
      class="date-input" 
      type="date" 
      id="from-date" 
      v-model="localFilters.fromDate"
      @change="handleFromDateChange"


    />
    <span class="date-separator">to</span>
    <input 
      class="date-input" 
      type="date" 
      id="to-date" 
      v-model="localFilters.toDate"
      @change="handleToDateChange"
    />
  </div>
  <div class="report-id-input">
    <label class="report-id-label" for="report-id">Report ID:</label>
    <input 
      type="text" 
      id="report-id" 
      placeholder="Enter Report ID" 
      v-model="localFilters.reportId"
      @change="handleReportIdChange"
    />
  </div>
  <button class="show-list-button" @click="handleShowList" :class="{ 'active': props.showList }" >
    {{ props.showList ? 'Show Map' : 'Show List' }}
  </button>

  <button class="clear-list-button" @click="clearFilters" :class="{'hidden': !hasActiveFilters, 'active': hasActiveFilters}" >
    Clear Filters
  </button>

</div>
</template>

<style scoped>


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
  background-color: #003366;
  color: white;
  border: none;
  padding: 5px 11px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  border: 2px solid #003366;
  font-weight: bold;
}

.show-list-button:hover {
  background-color: #5a6268;
  border: 2px solid #5a6268;
}

.show-list-button.active {

  background-color: white;
  color: #003366 ;
  border: 2px solid #003366;
  padding: 5px 11px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  font-weight: bold;

}
.show-list-button.active:hover {

  background-color: #5a6268;
  border: 2px solid #5a6268;
  color: white;


}

.clear-list-button.active {

background-color: white;
color: #003366 ;
border: 2px solid #003366;
padding: 5px 11px;
border-radius: 4px;
cursor: pointer;
font-size: 14px;
transition: background-color 0.3s ease;
font-weight: bold;

}
.clear-list-button.active:hover {

background-color: #5a6268;
border: 2px solid #5a6268;
color: white;


}

.clear-list-button.hidden {
  display: none;
}

</style>