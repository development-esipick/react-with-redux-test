import axios from 'axios';
axios.defaults.baseURL = 'https://api.dev.pastorsline.com'
axios.defaults.headers.common = {'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzEiLCJleHAiOjE2MDM3ODM0Mzd9.3ievseHtX0t3roGh7nBuNsiaQeSjfiHWyyx_5GlOLXk`}
export default axios;