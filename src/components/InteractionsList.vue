<script setup>
import { computed } from 'vue'
import { getAllDetails } from '../api/service'

const props = defineProps({
  interactionSummary: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['selected-incident'])

const handleIncidentClick = async (id) => {
  const details = await getAllDetails(id)
  console.log("test",details)
  // if (details.status === 'OK') {
    emit('selected-incident', details)
  // }
}


// Convert object to array for iteration because receiving as proxy from service func 
const incidentsArray = computed(() => {
  if (!props.interactionSummary || typeof props.interactionSummary !== 'object') {
    return []
  }

  let incidents = Object.entries(props.interactionSummary).map(([id, incident]) => ({
    id: id,
    serial: incident.serial,
    time: incident.time
  }))
  .sort((a, b) => {
    const serialA = parseInt(a.serial);
    const serialB = parseInt(b.serial);
    return serialB - serialA; // Sort in descending order (highest serial first)
  })
  // console.log(incidents)
  return incidents
})

</script>

<template>
  <div class="interactions-list">
    <!-- <h1>Interactions List</h1> -->
    
    <div v-if="incidentsArray.length" class="incidents-container">
      <div 
        class="interaction-card" 
        v-for="incident in incidentsArray" 
        :key="incident.id"
        @click="handleIncidentClick(incident.id)"
      >
        <h3 class="interaction-serial">Interaction: {{ incident.serial }}</h3>
        <p class="interaction-time">{{ incident.time }}</p>
      </div>
    </div>
    
    <div v-else class="no-incidents">
      No interactions found
    </div>
  </div>
</template>

<style scoped>
.interactions-list {
  /* padding: 0px; */
}

.incidents-container {
  display: flex;
  flex-direction: column;
  gap: 0;
  /* margin-top: 0px; */
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.interaction-card {
  /* padding: 15px 20px; */
  background: white;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  /* align-items: center;
  justify-content: left; */
  flex-direction: column;
  transition: background-color 0.2s ease;
}

.interaction-card:last-child {
  border-bottom: none;
}

.interaction-card:hover {
  background-color: #f8f9fa;
}

.interaction-card h3 {
  padding: 10px 10px 0px 10px;
  margin: 0;
  color: #003366;
  font-size: 16px;
  font-weight: 600;
}

.interaction-card p {
  padding: 10px;
  margin: 0;
  color: #003366;
  font-size: 14px;
  /* font-family: monospace; */
}

.no-incidents {
  text-align: center;
  margin-top: 40px;
  color: #666;
}

</style>
