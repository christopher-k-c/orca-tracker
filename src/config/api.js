

export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL,
    CLIENT_TYPE: import.meta.env.VITE_API_CLIENT_TYPE,
  }
  
  export const API_HEADERS = {
    'caapi-clienttype': API_CONFIG.CLIENT_TYPE
  }
  