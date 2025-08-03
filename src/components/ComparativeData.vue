

<script setup>

const props = defineProps({
  analysisUrl: {
    type: String,
    required: true
  }
})

</script>

<template>
  <div class="comparative-data">
    <h1>Comparative Data</h1>
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
</style>