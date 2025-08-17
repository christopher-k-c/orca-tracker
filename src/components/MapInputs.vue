

<script setup>

const props = defineProps({
  showList: Boolean,
})

const emit = defineEmits(['show-list'])


const showList = () => {
  emit('show-list')
  console.log('showList')
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
  <button class="show-list-button" @click="showList" :class="{ 'active': props.showList }" >
    {{ props.showList ? 'Hide List' : 'Show List' }}
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

</style>