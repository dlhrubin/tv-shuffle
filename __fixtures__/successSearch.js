const successSearch = {
  data: {
    page: 1,
    total_results: 2,
    total_pages: 1,
    results: [{
      original_name: 'How I Met Your Mother', genre_ids: [35], name: 'How I Met Your Mother', popularity: 51.212, origin_country: ['US'], vote_count: 1705, first_air_date: '2005-09-19', backdrop_path: '/eU1ejjxPMxlCq3JS5EvL49B8XO3.jpg', original_language: 'en', id: 1100, vote_average: 7.8, overview: 'Ted Mosby recounts to his son and daughter the events that led to his meeting their mother.', poster_path: '/b34jPzmB0wZy7EjUZoleXOl2RRI.jpg',
    }, {
      original_name: 'Как я встретил вашу маму', id: 85267, name: 'How I Met Your Mother', popularity: 1.981, vote_count: 0, vote_average: 0, first_air_date: '2010-10-04', poster_path: '/rTv2JPtemNBkOMDDNxqvEkGAI5S.jpg', genre_ids: [35], original_language: 'ru', backdrop_path: '/kWZVnBlI9u1Zjaql17bXnra20ud.jpg', overview: 'How I Met Your Mother, the Russian comedy series produced by the company Good Story Media, which is an adaptation of the eponymous American television series How I Met Your Mother.\n\nThe main character of the series, Dima Nosov, in the distant 2034, tells his teenage children about his own youth, as well as the life stories of his friends. Dima describes the circumstances in which he met his future wife. At the same time, he dwells on various events that took place in his life at that time with him and his friends: Pasha Vinogradov, Lucy Lyubimova, Yury Sadovskiy, and Katya Krivchik. The main action of the series takes place in Moscow today (in 1st season - in 2008–2009).', origin_country: ['RU'],
    }],
  },
  status: 200,
  statusText: '',
  headers: { 'cache-control': 'public, max-age=120', 'content-type': 'application/json;charset=utf-8' },
  config: {
    url: 'https://api.themoviedb.org/3/search/tv?', method: 'get', params: { api_key: process.env.GATSBY_API_KEY, query: 'how i met' }, headers: { Accept: 'application/json, text/plain, */*' }, transformRequest: [null], transformResponse: [null], timeout: 0, xsrfCookieName: 'XSRF-TOKEN', xsrfHeaderName: 'X-XSRF-TOKEN', maxContentLength: -1,
  },
  request: {},
};

export default successSearch;
