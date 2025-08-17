<script setup>

const props = defineProps({
    incident: {
        type: Object,
        default: null
    },
    activeTab: {
        type: String,
        default: 'interactions'
    },
    passage: {
    type: Object,
    default: null
  },
})

</script>

<template>
  <!-- Details Panel -->
  <div class="details-panel">

    <!-- Passage Details -->
    <template v-if="props.passage">
      <div class="panel-header">
        <h3>Passage Date:  {{ props.passage.date_passage_commenced.A}} {{ props.passage.time_passage_commenced.A}}</h3>
      </div>
      <div class="detail-item" v-for="passage in props.passage"
        :key="passage.id"
      >
        <strong>{{ passage.Q }}</strong>
        <p v-if="passage.Q === 'Moon'" v-html="passage.A"></p>
        <p v-else>{{ passage.A }}</p>
      </div>
    </template>

    <!-- Incident Details -->
    <template v-else-if="props.incident">
      <div class="panel-header">
        <h3>Interaction Date: {{ props.incident.date_of_interaction?.A || 'N/A' }} {{ props.incident.time_of_interaction?.A || 'N/A' }} </h3>
      </div>
      <div class="detail-item" v-for="incident in props.incident"
        :key="incident.id"
      >
        <strong>{{ incident.Q }}</strong>
        <p v-if="incident.Q === 'Moon'" v-html="incident.A"></p>
        <p v-else>{{ incident.A }}</p>
      </div>
    </template>

    <!-- Comparative Data -->
    <template v-else-if="activeTab === 'comparative'">
        <p class="comparative-text">
          We are pleased to publish the comparative data, which shows the data received in a total 
          reports received and % format. This enables users to see if there are any noticeable differences 
          in the factors being reported when an ‘interaction’ or ‘uneventful’ passage does or does not occur. 
          These factors include sea state/wind speed, boat speed, day/night, cloud cover, distance off land, 
          sea depth, hull/antifoul colour, type of rudder etc. At this stage, other than the comparative data, 
          there is insufficient data to make a more detailed analysis to see if clear patterns are emerging 
          of when ‘interactions’ or ‘uneventful passages’ do or do not occur.
        </p>
    </template>

    <!-- No selection text -->
    <template v-else>
      <div class="no-selection">
        <p v-if="activeTab === 'passages'">
          Select passage from the list to see details.
        </p>
        <p v-else-if="activeTab === 'interactions'">
          Select incident from the list to see details.
        </p>
      </div>
    </template>

  </div>
</template>

<style scoped>
.details-panel {
  padding: 15px;
  background-color: #fff;
  height: 100%;
  font-size: 0.9em;
  border-radius: 8px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  border-bottom: 2px solid #003366;
  padding-bottom: 10px;
}

.panel-header h3 {
  margin: 0;
  color: #003366;
  font-size: 1.1em;
}

.link-to-report {
  color: #007bff;
  text-decoration: none;
  font-size: 0.9em;
}

.link-to-report:hover {
  text-decoration: underline;
}

.detail-item {
  margin-bottom: 10px;
  font-size: 0.85em;
  line-height: 1.3;
}

.detail-item strong {
  color: Black;
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

.detail-item p {
  margin: 5px 0 0 0;
  padding-left: 10px;
  color: #333;
  background-color: #f8f9fa;
  padding: 8px 12px;
  border-radius: 6px;
  border-left: 3px solid #003366;
}

.no-selection {
  text-align: center;
  color: #777;
  margin-top: 50px;
  font-style: italic;
}

.no-selection p {
  font-size: 1.1em;
}
.comparative-text {

  text-align: center;
  color: #777;
  margin-top: 50px;
  font-style: italic;
  font-size: 1.1em;
}
</style> 