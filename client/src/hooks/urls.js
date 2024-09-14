const production = {
  url: 'https://app-worldwise-api-erhan-ertem.onrender.com',
};
const development = {
  url: 'http://localhost:8000',
};

let ENV = 'production';

const config = ENV === 'development' ? development : production;

const BASE_URL = config.url;

export default BASE_URL;
