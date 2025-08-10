<script setup>

// import { computed } from 'vue'

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


console.log(props.incident)



</script>

<template>
  <div class="details-panel">

    <template v-if="props.passage">
        <div class="panel-header">
            <h3>Passage: {{ props.passage.serial }}</h3>
        
        </div>









    </template>
    <template v-if="props.incident">
      <div class="panel-header">
        <h3>Interaction Date: {{ props.incident.date_of_interaction?.A || 'N/A' }} {{ props.incident.time_of_interaction?.A || 'N/A' }} </h3>
        <!-- <a href="#" class="link-to-report">{{ props.incident.date_of_interaction?.A || 'N/A' }}</a> -->
      </div>


      <div class="detail-item" v-if="props.incident.antifoul_colour?.Q && props.incident.antifoul_colour?.A">
        <strong>{{ props.incident.antifoul_colour.Q }}</strong>
        <p>{{ props.incident.antifoul_colour.A }}</p>
      </div>

      <div class="detail-item" v-if="props.incident.autopilot?.Q && props.incident.autopilot?.A">
        <strong>{{ props.incident.autopilot.Q }}</strong> 
        <p>{{ props.incident.autopilot.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.behaviour_text_edited?.Q && props.incident.behaviour_text_edited?.A">
        <strong>{{ props.incident.behaviour_text_edited.Q }}</strong> 
        <p>{{ props.incident.behaviour_text_edited.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.boat_length?.Q && props.incident.boat_length?.A">
        <strong>{{ props.incident.boat_length.Q }}</strong>
        <p>{{ props.incident.boat_length.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.boat_type?.Q && props.incident.boat_type?.A">
        <strong>{{ props.incident.boat_type.Q }}</strong>
        <p>{{ props.incident.boat_type.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.cloud_cover?.Q && props.incident.cloud_cover?.A">
        <strong>{{ props.incident.cloud_cover.Q }}</strong>
        <p>{{ props.incident.cloud_cover.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.damaged?.Q && props.incident.damaged?.A">
        <strong>{{ props.incident.damaged.Q }}</strong>
        <p>{{ props.incident.damaged.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.darkness_or_daylight?.Q && props.incident.darkness_or_daylight?.A">
        <strong>{{ props.incident.darkness_or_daylight.Q }}</strong>
        <p>{{ props.incident.darkness_or_daylight.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.date_of_interaction?.Q && props.incident.date_of_interaction?.A">
        <strong>{{ props.incident.date_of_interaction.Q }}</strong>
        <p>{{ props.incident.date_of_interaction.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.daystage?.Q && props.incident.daystage?.A">
        <strong>{{ props.incident.daystage.Q }}</strong>
        <p>{{ props.incident.daystage.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.depth?.Q && props.incident.depth?.A">
        <strong>{{ props.incident.depth.Q }}</strong>
        <p>{{ props.incident.depth.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.depth_gauge?.Q && props.incident.depth_gauge?.A">
        <strong>{{ props.incident.depth_gauge.Q }}</strong>
        <p>{{ props.incident.depth_gauge.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.distance_off_land?.Q && props.incident.distance_off_land?.A">
        <strong>{{ props.incident.distance_off_land.Q }}</strong>
        <p>{{ props.incident.distance_off_land.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.hull_topsides_colour?.Q && props.incident.hull_topsides_colour?.A">
        <strong>{{ props.incident.hull_topsides_colour.Q }}</strong>
        <p>{{ props.incident.hull_topsides_colour.A }}</p>
      </div>

      <div class="detail-item" v-if="props.incident.lat_deg?.Q && props.incident.lat_deg?.A">
        <strong>{{ props.incident.lat_deg.Q }}</strong>
        <p>{{ props.incident.lat_deg.A }}</p>
      </div>

      <div class="detail-item" v-if="props.incident.lat_min?.Q && props.incident.lat_min?.A">
        <strong>{{ props.incident.lat_min.Q }}</strong>
        <p>{{ props.incident.lat_min.A }}</p>
      </div>

      <div class="detail-item" v-if="props.incident.length_of_interaction?.Q && props.incident.length_of_interaction?.A">
        <strong>{{ props.incident.length_of_interaction.Q }}</strong>
        <p>{{ props.incident.length_of_interaction.A }}</p>
      </div>

      <div class="detail-item" v-if="props.incident.long_deg?.Q && props.incident.long_deg?.A">
        <strong>{{ props.incident.long_deg.Q }}</strong>
        <p>{{ props.incident.long_deg.A }}</p>
      </div>

      <div class="detail-item" v-if="props.incident.long_min?.Q && props.incident.long_min?.A">
        <strong>{{ props.incident.long_min.Q }}</strong>
        <p>{{ props.incident.long_min.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.moon?.Q && props.incident.moon?.A">
        <strong>{{ props.incident.moon.Q }}</strong>
        <p v-html="props.incident.moon.A"></p>
      </div>
      
      <div class="detail-item" v-if="props.incident.motoring_or_sailing?.Q && props.incident.motoring_or_sailing?.A">
        <strong>{{ props.incident.motoring_or_sailing.Q }}</strong>
        <p>{{ props.incident.motoring_or_sailing.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.number_of_adult_orcas_seen?.Q && props.incident.number_of_adult_orcas_seen?.A">
        <strong>{{ props.incident.number_of_adult_orcas_seen.Q }}</strong>
        <p>{{ props.incident.number_of_adult_orcas_seen.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.number_of_juvenile_orcas_seen?.Q && props.incident.number_of_juvenile_orcas_seen?.A">
        <strong>{{ props.incident.number_of_juvenile_orcas_seen.Q }}</strong>
        <p>{{ props.incident.number_of_juvenile_orcas_seen.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.orca_contact_with_boat?.Q && props.incident.orca_contact_with_boat?.A">
        <strong>{{ props.incident.orca_contact_with_boat.Q }}</strong>
        <p>{{ props.incident.orca_contact_with_boat.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.response_text_edited?.Q && props.incident.response_text_edited?.A">
        <strong>{{ props.incident.response_text_edited.Q }}</strong>
        <p>{{ props.incident.response_text_edited.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.rudder?.Q && props.incident.rudder?.A">
        <strong>{{ props.incident.rudder.Q }}</strong>
        <p>{{ props.incident.rudder.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.sea_state?.Q && props.incident.sea_state?.A">
        <strong>{{ props.incident.sea_state.Q }}</strong>
        <p>{{ props.incident.sea_state.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.speed?.Q && props.incident.speed?.A">
        <strong>{{ props.incident.speed.Q }}</strong>
        <p>{{ props.incident.speed.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.tide?.Q && props.incident.tide?.A">
        <strong>{{ props.incident.tide.Q }}</strong>
        <p>{{ props.incident.tide.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.time_of_interaction?.Q && props.incident.time_of_interaction?.A">
        <strong>{{ props.incident.time_of_interaction.Q }}</strong>
        <p>{{ props.incident.time_of_interaction.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.tow_required?.Q && props.incident.tow_required?.A">
        <strong>{{ props.incident.tow_required.Q }}</strong>
        <p>{{ props.incident.tow_required.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.towing?.Q && props.incident.towing?.A">
        <strong>{{ props.incident.towing.Q }}</strong>
        <p>{{ props.incident.towing.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.trailing_fishing_lure?.Q && props.incident.trailing_fishing_lure?.A">
        <strong>{{ props.incident.trailing_fishing_lure.Q }}</strong>
        <p>{{ props.incident.trailing_fishing_lure.A }}</p>
      </div>
      
      <div class="detail-item" v-if="props.incident.wind_speed?.Q && props.incident.wind_speed?.A">
        <strong>{{ props.incident.wind_speed.Q }}</strong>
        <p>{{ props.incident.wind_speed.A }}</p>
      </div>
      
    </template>
    <template v-else-if="activeTab === 'comparative'">
        <p class="comparative-text">
            We are pleased to publish the comparative data, which shows the data received in a total reports received and % format. This enables users to see if there are any noticeable differences in the factors being reported when an ‘interaction’ or ‘uneventful’ passage does or does not occur. These factors include sea state/wind speed, boat speed, day/night, cloud cover, distance off land, sea depth, hull/antifoul colour, type of rudder etc.

At this stage, other than the comparative data, there is insufficient data to make a more detailed analysis to see if clear patterns are emerging of when ‘interactions’ or ‘uneventful passages’ do or do not occur.
        </p>

    </template>

    <template v-else-if="activeTab === 'passages'">
      <div class="no-selection">
        <p>Select an passage from the list to see details.</p>
      </div>
    </template>
    <template v-else-if="activeTab === 'interactions'">
      <div class="no-selection">
        <p>Select an incident from the list to see details.</p>
      </div>
    </template>




    
  </div>
</template>

<style scoped>
.details-panel {
  padding: 15px;
  background-color: #fff;
  height: 100%;
  /* overflow-y: auto; */
  font-size: 0.9em;
  border-radius: 8px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  /* border-bottom: 1px solid #eee;
  padding-bottom: 8px; */

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