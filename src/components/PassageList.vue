<script setup>
import { computed } from 'vue'
// Get individual details for each passage 
import { getPassageDetails } from '../api/service'

const props = defineProps({
  passageSummary: {
    type: Object,
    default: () => ({})
  }
})

// let test = Object.values(props.passageSummary).map(incident => {console.log(incident)})/
console.log(props.passageSummary)

const emit = defineEmits(['selected-passage'])

const handlePassageClick = async (passage) => {
    const details = await getPassageDetails(passage.id)
    emit('selected-passage', details)  
}

// Convert the object to an array for easy looping
const passagesArray = computed(() => {
    let passagesPleaseWork = Object.entries(props.passageSummary).map(([id, passage]) => ({
    id: id,
    serial: passage.serial,
    timeStart: passage.time_start,
    timeEnd: passage.time_end
  }))
  .sort((a, b) => {
    // Sort by serial number (descending - highest first)
    const serialA = parseInt(a.serial);
    const serialB = parseInt(b.serial);
    return serialB - serialA;
  })
  return passagesPleaseWork
})

</script>

<template>
  <div class="passage-list">
    <h2>Uneventful Passages</h2>
    
    <div class="passages-container">
      <div 
        v-for="passage in passagesArray" 
        :key="passage.id"
        class="passage-item"
        @click="handlePassageClick(passage)"
      >
        <div class="passage-header">
          <span class="passage-serial">Passage: {{ passage.serial }}</span>
        </div>
        
        <div class="passage-times">
          <div class="time-row">
            <span class="time-label">Start: </span>
            <span class="time-value">{{ passage.timeStart }}</span>
          </div>
          <div class="time-row">
            <span class="time-label">End: </span>
            <span class="time-value">{{ passage.timeEnd }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.passage-count {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}

.passages-container {
  display: flex;
  flex-direction: column;
  /* gap: 15px; */
}

.passage-item {
  background-color: #fff;
  border: .5px solid #e0e0e0;
  
  /* border-radius: 8px 8px 0 0; */
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

.passage-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  background-color: #f8f9fa;
}

.passage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.passage-serial {
  font-weight: 600;
  color: #003366;
  font-size: 16px;
  
  
}

.passage-id {
  color: #666;
  font-size: 12px;
  background-color: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
}

.passage-times {
  display: flex;
  flex-direction: column;
  gap: 8px;

}

.time-row {
  display: flex;
  justify-content: start;
  align-items: center;

}

.time-label {
  font-weight: 500;
  color: #003366;
  font-size: 14px;
  padding-right: 10px;
  font-weight: bold;
  color: black
}

.time-value {
  color: #003366;
  font-size: 14px;

}
</style>