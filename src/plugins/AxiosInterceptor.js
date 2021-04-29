import axios from "axios"

const baseUrl = 'http://127.0.0.1:8000/'

axios.interceptors.request.use(
  (config) => {
    const token = String(localStorage.getItem('token') || -1)
    if (token !== '-1' && config.url !== 'authentication_token') {
      config.headers['Authorization'] = 'Bearer ' + token
    } else {
      delete config.headers['Authorization']
    }
    return config
  }, (err) => {
    Promise.reject(err)
  }
)


axios.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {

    const originalRequest = error.config;
    // Prevent infinite loops
    if (error.response.status === 401 && originalRequest.url === baseUrl +'/token/refresh') {
      console.log("antiboucle")
      window.location.href = '/connexion/'
      return Promise.reject(error);
    }


    if (error.response.data.message === "Expired JWT Token" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized")
    {

      const refreshToken = localStorage.getItem('refresh_token')

      if (refreshToken){

        return axios
          .post('/token/refresh', {refresh: refreshToken})
          .then((response) => {

            localStorage.setItem('access_token', response.data.access)
            localStorage.setItem('refresh_token', response.data.refresh)

            axios.defaults.headers['Authorization'] = "Bearer " + response.data.access
            originalRequest.headers['Authorization'] = "Bearer " + response.data.access

            return axios(originalRequest)
          })
          .catch(err => {
            console.log(err)
          })
      }else{
        console.log("Refresh token not available.")
        window.location.href = '/connexion/'
      }
    }
    else
    {
      console.log(error.response.data)
    }
    // specific error handling done elsewhere
    return Promise.reject(error)
  }
);

export default axios