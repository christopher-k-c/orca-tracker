// // import { API_CONFIG, API_HEADERS } from '@/config/api'
// // API endpoints
// const API_BASE = 'https://api.theca.org.uk/orcasurvey/v1';
// const API_HEADERS = {
//   'caapi-clienttype': 'websiteapp'
// };
// // Get incident summary
// export const getIncidentSummary = async () =>{
//     try{
//       const response = await fetch(`${API_CONFIG.BASE_URL}/reportlist`, {
//         method: 'GET',
//         headers: API_HEADERS
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const summary = await response.json()
//       const incidents = Object.values(summary.reports.incident);
//       incidents.sort((a, b) => a.serial - b.serial);
//       console.log(summary.reports.incident)
//       return incidents
//     }
//     catch (error){
//       console.error('Error fetching incident summary:', error)
//       throw error
//     }
//   }

//   // Get incident summary
// export const getAll = async (id) =>{
//   try{
//     const response = await fetch(`${API_CONFIG.BASE_URL}/incidentresponse/${id}`, {
//       method: 'GET',
//       headers: API_HEADERS
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const summary = await response.json()

//     console.log(summary)
//     return summary
//   }
//   catch (error){
//     console.error('Error fetching incident details:', error)
//     throw error
//   }
// }


// API endpoints
const API_BASE = 'https://api.theca.org.uk/orcasurvey/v1';
const API_HEADERS = {
  'caapi-clienttype': 'websiteapp'
};

// Get incident summary
export const getIncidentSummary = async () =>{
    try{
      const response = await fetch(`${API_BASE}/reportlist?withdetails=true`, {
        method: 'GET',
        headers: API_HEADERS
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const summary = await response.json()
      const incidents = Object.values(summary.reports.incident);
      incidents.sort((a, b) => a.serial - b.serial);
      console.log(summary.reports.incident)
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


  // Get incident summary
  export const getUneventfulPassages = async (id) =>{
    try{
      const response = await fetch(`${API_BASE}/reportlist`, {
        method: 'GET',
        headers: API_HEADERS
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const summary = await response.json()
      const uneventful = summary.reports.uneventful
  
      console.log(uneventful)
      return uneventful
    }
    catch (error){
      console.log(error)
    }
  }