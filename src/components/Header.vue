<script setup>
const props = defineProps({
  activeTab: String,
  interactionCount: Number,
  passageCount: Number,
  uneventfulCount: Number,

})

// Emits
const emit = defineEmits(['tab-change'])

// Handler
const selectTab = (tab) => {
  emit('tab-change', tab)
}


</script>

<template>

  <div class="topbar">
    <!-- Tab Buttons -->
    <nav class="tab-buttons">
      <button 
      :class="{ 'tab-button': true, 'active': activeTab === 'interactions' }"
      @click="selectTab('interactions')"
      >
        Orca interactions ({{ interactionCount }})
      </button>
      <button
        :class="{ 'tab-button': true, 'active': activeTab === 'passages' }"
        @click="selectTab('passages')"
      >
        Uneventful passages ({{ uneventfulCount }})
      </button>
      <button
        :class="{ 'tab-button': true, 'active': activeTab === 'comparative' }"
        @click="selectTab('comparative')"
      >
        Comparative Data 
      </button>
    </nav>
  </div>

  <!-- Search Field -->
  <div class="search-controls">
    <div class="date-inputs">
      <input type="date" name="" id="">
    </div>
    <div class="search-bar"></div>
  </div>




</template>

<style scoped>

.topbar {
  border-bottom: 2px solid #003366;
  margin-bottom: 10px;
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


</style>
