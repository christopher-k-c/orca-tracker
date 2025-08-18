

<script setup>

const props = defineProps({
  analysisUrl: {
    type: String,
    required: false, 
    default: '' 
  }
})

</script>

<template>
  <div class="comparative-data">
    <h2>Comparative Data</h2>
    <iframe 
      :src="analysisUrl"
      class="analysis-frame"
      title="Orca Survey Analysis"
      frameborder="0"
    ></iframe>
  </div>
</template>

<style scoped>

.comparative-data {
  width: 100%;
  height: 100%;
}

.analysis-frame {
  width: 100%;
  height: 600px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.comparative-data h2 {
  color: black;
  margin-bottom: 10px;
}
</style>