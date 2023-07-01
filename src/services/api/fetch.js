import axios from 'axios';

export async function fetchImages(searchText, page, options) {
  const API_KEY = '36396693-28c70313af4bfc02da8bd4331';
  const URL = 'https://pixabay.com/api/';
  const params = {
    ...options,
    q: searchText,
    page: page,
  };

  let parameters = new URLSearchParams(params);
  const images = await axios.get(`${URL}?key=${API_KEY}&${parameters}`);

  return images;
}
