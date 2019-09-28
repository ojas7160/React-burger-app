import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://react-burger-app-d5211.firebaseio.com/'
})

export default instance;