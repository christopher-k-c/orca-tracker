<script setup>


const props = defineProps({
  activeTab: String,
  interactionCount: Number,
  passageCount: Number,
  uneventfulCount: Number,
})

const emit = defineEmits(['tab-change'])

// Tab handler
const selectTab = (tab) => {
  emit('tab-change', tab)
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
  /* background-color: #555;
  color: white; */
  background-color: white;
  color: #003366 ;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px 4px 0 0;
  margin-right: 5px;
  transition: background-color 0.3s ease;
  font-weight: bold;
}

.tab-button.active {
  color: white;
  background-color: #003366;
  /* font-weight: bold; */
}

.tab-button:hover {
  background-color: #003366;
  color: white;
}

.tab-button:hover.active {
  background-color: #003366;
  color: white;
}
</style>