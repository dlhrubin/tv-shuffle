const randomSeasonAllSeed2 = {
  data: {
    air_date: '2012-11-19',
    crew: [{
      id: 1222189, credit_id: '5254162c19c295794037c0a6', name: 'Tami Sagher', department: 'Writing', job: 'Writer', gender: 0, profile_path: null,
    }, {
      id: 1222077, credit_id: '5256c6e019c2956ff602e3f9', name: 'Pamela Fryman', department: 'Directing', job: 'Director', gender: 1, profile_path: null,
    }],
    episode_number: 7,
    guest_stars: [{
      id: 21131, name: 'Joe Lo Truglio', credit_id: '5de3fe663faba000150e0f4e', character: 'Honeywell', order: 507, gender: 2, profile_path: '/6un98WmgjAllrzMwjjZF2Bn8XZc.jpg',
    }, {
      id: 20580, name: 'Joe Manganiello', credit_id: '5256c6f619c2956ff602f776', character: 'Brad Morris', order: 508, gender: 2, profile_path: '/9BO82zsx7Fi8ABzAA6Qh4T84W0w.jpg',
    }],
    name: 'The Stamp Tramp',
    overview: 'Marshall recommends his old law school classmate Brad for a job at his firm, but the interview goes awry, leaving Marshall to do damage control with his boss. Meanwhile, Robin helps negotiate Barney’s return to the strip club circuit.',
    id: 62931,
    production_code: '8ALH07',
    season_number: 8,
    still_path: '/xxSwvP45IE2w3SM05sY4cusRLDu.jpg',
    vote_average: 6.778,
    vote_count: 9,
  },
  status: 200,
  statusText: '',
  headers: {
    'cache-control': 'public, max-age=21600', 'content-type': 'application/json;charset=utf-8', etag: 'W/"00f20888abf2a82ed800f23022b5c448"', 'last-modified': 'Fri, 29 May 2020 22:04:14 GMT',
  },
  config: {
    url: 'https://api.themoviedb.org/3/tv/1100/season/8/episode/7', method: 'get', params: { api_key: process.env.GATSBY_API_KEY }, headers: { Accept: 'application/json, text/plain, */*' }, transformRequest: [null], transformResponse: [null], timeout: 0, xsrfCookieName: 'XSRF-TOKEN', xsrfHeaderName: 'X-XSRF-TOKEN', maxContentLength: -1,
  },
  request: {},
};

export default randomSeasonAllSeed2;
