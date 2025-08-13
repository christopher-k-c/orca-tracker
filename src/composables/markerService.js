import {getSummaryData} from '../api/service'



export const useMarkerService = () => {
  const markers = ref([])

  return {
    markers
  }
}