import { API_CONFIG, API_HEADERS } from '@/config/api'

// Get incident summary
export const getIncidentSummary = async () =>{
    try{
      const response = await fetch(`${API_BASE}/reportlist`, {
        method: 'GET',
        headers: API_HEADERS
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const summary = await response.json()
      const incidents = Object.values(summary.reports.incident);
      incidents.sort((a, b) => a.serial - b.serial);
      // console.log(summary.reports.incident)
      return incidents
    }
    catch (error){
      console.log(error)
    }
  }

  // Get incident summary
export const getAll = async (id) =>{
  try{
    const response = await fetch(`${API_BASE}/incidentresponse/${id}`, {
      method: 'GET',
      headers: API_HEADERS
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const summary = await response.json()

    console.log(summary)
    return all
  }
  catch (error){
    console.log(error)
  }
}