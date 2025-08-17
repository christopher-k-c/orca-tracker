import { BASE_URL, API_HEADERS } from '@/config/api'
import { ref, readonly } from 'vue'


// Get incident summary
export const getSummaryData = async () => {
  
  try {
    // console.log('API Config:', { BASE_URL, API_HEADERS })
    
    const response = await fetch(`${BASE_URL}/reportlist?withdetails=true`, {
      method: 'GET',
      headers: API_HEADERS
    });
    
    // console.log('Response status:', response.status)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const summary = await response.json()
    console.log('API Response:', summary)

    
    
    const incidents = summary.reports;
    // console.log('Incidents data:', incidents)
    
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
    console.error('Error fetching incident details:', error)
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
    console.log('Uneventful passages:', uneventful)
    return passage
  } catch (error) {
    console.error('Error fetching uneventful passages:', error)
    return { reports: { incident: [], uneventful: [] } }
  }
}







