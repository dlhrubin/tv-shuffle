import config from '../config';

const randomSeasonAllSeed1 = {
  data: {
    air_date: '2010-03-08',
    crew: [{
      id: 1222077, credit_id: '5256c6e019c2956ff602e3f9', name: 'Pamela Fryman', department: 'Directing', job: 'Director', gender: 1, profile_path: null,
    }, {
      id: 1222179, credit_id: '5254161f19c295794037c01a', name: 'Matt Kuhn', department: 'Writing', job: 'Writer', gender: 2, profile_path: null,
    }],
    episode_number: 17,
    guest_stars: [{
      id: 16866, name: 'Jennifer Lopez', credit_id: '5256c75619c2956ff6033982', character: 'Anita', order: 0, gender: 1, profile_path: '/80DP8sLNWHxV5EJUQxaA8uaFFxo.jpg',
    }, {
      id: 13138, name: 'Benjamin Koldyke', credit_id: '5256c75119c2956ff60334fe', character: 'Don Frank', order: 432, gender: 0, profile_path: null,
    }],
    name: 'Of Course',
    overview: 'When Robin confesses that she is still angry with Barney for the way he handled their break-up, she enlists the help of Anita, a self-help author who plans to beat Barney at his own game.',
    id: 62860,
    production_code: '5ALH18',
    season_number: 5,
    still_path: '/vA9nqwWH30NpaIs2AMCrZsVX7be.jpg',
    vote_average: 7.429,
    vote_count: 7,
  },
  status: 200,
  statusText: '',
  headers: {
    'cache-control': 'public, max-age=21600', 'content-type': 'application/json;charset=utf-8', etag: 'W/"09475463f216aa55f3e136b776c442c0"', 'last-modified': 'Fri, 29 May 2020 21:42:32 GMT',
  },
  config: {
    url: 'https://api.themoviedb.org/3/tv/1100/season/5/episode/17', method: 'get', params: { api_key: config.KEY }, headers: { Accept: 'application/json, text/plain, */*' }, transformRequest: [null], transformResponse: [null], timeout: 0, xsrfCookieName: 'XSRF-TOKEN', xsrfHeaderName: 'X-XSRF-TOKEN', maxContentLength: -1,
  },
  request: {},
};

export default randomSeasonAllSeed1;
