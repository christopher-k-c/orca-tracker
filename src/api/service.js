import { BASE_URL, API_HEADERS } from '@/config/api'
import { ref, readonly } from 'vue'


// Get incident summary
export const getSummaryData = async () => {

  const errorMessage = ref('')


  try {
    
    const response = await fetch(`${BASE_URL}/reportlist?withdetails=true`, {
      method: 'GET',
      headers: API_HEADERS
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const summary = await response.json()

    const incidents = summary.reports;    
    return incidents
  } catch (error) {
    console.error('Error fetching incident summary:', error)
    return {}
  }
}

// Combine summary and details function into one by passing endpint in 

// Get incident details by ID
export const getIncidentDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/incidentresponse/${id}`, {
      method: 'GET',
      headers: API_HEADERS
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const details = await response.json()
    const detailsObject = details.response
    return detailsObject
  } catch (error) {

    return null
  }
}


// Get uneventful passages
export const getPassageDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/uneventfulresponse/${id}`, {
      method: 'GET',
      headers: API_HEADERS
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const uneventful = await response.json()
    const passage = uneventful.response

    return passage
  } catch (error) {

    return { reports: { incident: [], uneventful: [] } }
  }
}







