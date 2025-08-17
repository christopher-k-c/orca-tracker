import { computed } from 'vue'

export function useIncidentFiltering(allIncidents, dateFilters) {

  const filteredIncidents = computed(() => {

    if (!dateFilters.value.fromDate && !dateFilters.value.toDate && !dateFilters.value.reportId) {
      return allIncidents.value
    }

    let filtered = { ...allIncidents.value }


    if (dateFilters.value.fromDate || dateFilters.value.toDate) {
      filtered = Object.entries(allIncidents.value).reduce((acc, [id, incident]) => {
        const incidentDate = new Date(incident.time)
        const fromDate = dateFilters.value.fromDate ? new Date(dateFilters.value.fromDate) : null
        const toDate = dateFilters.value.toDate ? new Date(dateFilters.value.toDate) : null
        let include = true
        if (fromDate && incidentDate < fromDate) include = false
        if (toDate && incidentDate > toDate) include = false
        if (include) acc[id] = incident
        return acc
      }, {})
    }

    // Filter by report ID
    if (dateFilters.value.reportId) {
      filtered = Object.entries(filtered).reduce((acc, [id, incident]) => {
        if (incident.serial === dateFilters.value.reportId) {
          acc[id] = incident
        }
        return acc
      }, {})
    }


    return filtered
  })



  return {
    filteredIncidents
  }
}