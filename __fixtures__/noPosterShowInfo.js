import config from '../config';

const noPosterShowInfo = {
  data: {
    backdrop_path: null,
    created_by: [],
    episode_run_time: [30],
    first_air_date: '1999-10-11',
    genres: [],
    homepage: '',
    id: 28366,
    in_production: true,
    languages: [],
    last_air_date: '2000-04-13',
    last_episode_to_air: {
      air_date: '2000-04-13', episode_number: 133, id: 706637, name: 'Episode 133', overview: '', production_code: '', season_number: 1, show_id: 28366, still_path: null, vote_average: 0, vote_count: 0,
    },
    name: 'Days of Delight',
    next_episode_to_air: null,
    networks: [],
    number_of_episodes: 133,
    number_of_seasons: 1,
    origin_country: [],
    original_language: 'en',
    original_name: 'Days of Delight',
    overview: '',
    popularity: 0.84,
    poster_path: null,
    production_companies: [],
    seasons: [{
      air_date: '1999-10-11', episode_count: 133, id: 39554, name: 'Season 1', overview: '', poster_path: null, season_number: 1,
    }],
    status: 'Ended',
    type: 'Scripted',
    vote_average: 0,
    vote_count: 0,
  },
  status: 200,
  statusText: '',
  headers: {
    'cache-control': 'public, max-age=3600', 'content-length': '893', 'content-type': 'application/json;charset=utf-8', 'last-modified': 'Fri, 29 May 2020 17:19:26 GMT',
  },
  config: {
    url: 'https://api.themoviedb.org/3/tv/28366', method: 'get', params: { api_key: config.KEY }, headers: { Accept: 'application/json, text/plain, */*' }, transformRequest: [null], transformResponse: [null], timeout: 0, xsrfCookieName: 'XSRF-TOKEN', xsrfHeaderName: 'X-XSRF-TOKEN', maxContentLength: -1,
  },
  request: {},
};

export default noPosterShowInfo;
