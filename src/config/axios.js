import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
axios.defaults.headers.common = {'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`}
export default axios;