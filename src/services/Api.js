import axios from 'axios';

const KEY = '26972280-5e0734b593481367c97a8fc1d';
axios.defaults.baseURL = 'https://pixabay.com/api';

const ServiceApi = async (name, page) => {
  const response = await axios.get(
    `?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};

const Api = {
  ServiceApi,
};

export default Api;
