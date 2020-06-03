const noPosterSearch = {
  data: {
    page: 1,
    total_results: 1,
    total_pages: 1,
    results: [{
      original_name: 'Days of Delight', id: 28366, name: 'Days of Delight', popularity: 0.84, vote_count: 0, vote_average: 0, first_air_date: '1999-10-11', poster_path: null, genre_ids: [], original_language: 'en', backdrop_path: null, overview: '', origin_country: [],
    }],
  },
  status: 200,
  statusText: '',
  headers: { 'cache-control': 'public, max-age=120', 'content-type': 'application/json;charset=utf-8' },
  config: {
    url: 'https://api.themoviedb.org/3/search/tv?', method: 'get', params: { api_key: process.env.GATSBY_API_KEY, query: 'days of de' }, headers: { Accept: 'application/json, text/plain, */*' }, transformRequest: [null], transformResponse: [null], timeout: 0, xsrfCookieName: 'XSRF-TOKEN', xsrfHeaderName: 'X-XSRF-TOKEN', maxContentLength: -1,
  },
  request: {},
};

export default noPosterSearch;
