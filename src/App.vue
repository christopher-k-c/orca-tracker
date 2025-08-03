<script setup>
import Header from './components/Header.vue';
import { ref } from 'vue';



// State for active tab
const activeTab = ref('interactions')
// Handler
const handleTabChange = (tab) => {
  activeTab.value = tab

}







</script>

<template>

  <Header
  :activeTab="activeTab"
  @tab-change="handleTabChange"/>





</template>

<style scoped>


</style>
