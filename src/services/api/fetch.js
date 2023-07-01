import axios from 'axios';

const API_KEY = '36396693-28c70313af4bfc02da8bd4331';
axios.defaults.baseURL = 'https://pixabay.com/api';

export const PER_PAGE = 15;

const defaultOptions = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: PER_PAGE,
};

export async function fetchImages(searchText, page) {
  const params = {
    ...defaultOptions,
    q: searchText,
    page: page,
  };

  // let parameters = new URLSearchParams(params);
  const response = await axios.get('/', { params });

  return response.data;
}
