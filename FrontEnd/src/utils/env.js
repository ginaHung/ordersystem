import pkJson from '../../package.json';

// let NODE_ENV = process.env.NODE_ENV || 'development';

let url = '';
// url = pkJson.config.url;
if (window.location.host !== 'localhost:8888') {
  url = `${window.location.protocol}//${window.location.host}`;
} else {
  url = pkJson.config.url;
}

export const defaultConfig = {
  url,
  api_url: `${url}/api/`,
};
