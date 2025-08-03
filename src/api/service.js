import { BASE_URL, API_HEADERS } from '@/config/api'

// Get incident summary
export const getIncidentSummary = async () => {
  try {
    const response = await fetch(`${BASE_URL}/reportlist?withdetails=true`, {
      method: 'GET',
      headers: API_HEADERS
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const summary = await response.json()
    const incidents = summary.reports.incident;

    return incidents
  } catch (error) {
    console.error('Error fetching incident summary:', error)

  }
}


// Get incident details by ID
export const getAllDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/incidentresponse/${id}`, {
      method: 'GET',
      headers: API_HEADERS
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const details = await response.json()

    return details // Fixed: was returning 'all' instead of 'summary'
  } catch (error) {
    console.error('Error fetching incident details:', error)
    return null
  }
}

// Get uneventful passages
export const getAllIds = async () => {
  try {
    const response = await fetch(`${BASE_URL}/reportlist`, {
      method: 'GET',
      headers: API_HEADERS
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const reportIds = await response.json()

    return reportIds
  } catch (error) {
    console.error('Error fetching uneventful passages:', error)

  }
}


