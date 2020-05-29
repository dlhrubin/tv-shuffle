import config from '../config';

const notFoundSearch = {
  data: {
    page: 1, total_results: 0, total_pages: 0, results: [],
  },
  status: 200,
  statusText: '',
  headers: { 'cache-control': 'public, max-age=120', 'content-type': 'application/json;charset=utf-8' },
  config: {
    url: 'https://api.themoviedb.org/3/search/tv?', method: 'get', params: { api_key: config.KEY, query: 'abcd' }, headers: { Accept: 'application/json, text/plain, */*' }, transformRequest: [null], transformResponse: [null], timeout: 0, xsrfCookieName: 'XSRF-TOKEN', xsrfHeaderName: 'X-XSRF-TOKEN', maxContentLength: -1,
  },
  request: {},
};

export default notFoundSearch;
