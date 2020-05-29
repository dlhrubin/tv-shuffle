import config from '../config';

const randomSeason2 = {
  data: {
    air_date: '2007-01-08',
    crew: [{
      id: 1222077, credit_id: '5256c6e019c2956ff602e3f9', name: 'Pamela Fryman', department: 'Directing', job: 'Director', gender: 1, profile_path: null,
    }],
    episode_number: 12,
    guest_stars: [{
      id: 63735, name: 'Misti Traya', credit_id: '5256c6fe19c2956ff602fe98', character: 'Molly', order: 0, gender: 1, profile_path: '/mo5Kj2vhmCgL7TyBhz002tvg5nB.jpg',
    }, {
      id: 1223692, name: 'Brian Kubach', credit_id: '5256c70019c2956ff602fee2', character: 'Brian', order: 2, gender: 2, profile_path: null,
    }, {
      id: 78341, name: 'Ryan Pinkston', credit_id: '5256c70119c2956ff602ff5a', character: 'Kyle', order: 4, gender: 0, profile_path: '/arTVn9MjLfmdL9wexc31vrtygyZ.jpg',
    }, {
      id: 116882, name: 'Lyndsy Fonseca', credit_id: '5254161719c295794037bef2', character: 'Penny Mosby', order: 6, gender: 1, profile_path: '/nFgo7oEqvwubxejBfNQwHv8Tp3x.jpg',
    }, {
      id: 205307, name: 'Lucy Hale', credit_id: '5256c70019c2956ff602ff20', character: 'Katie Scherbatsky', order: 511, gender: 1, profile_path: '/rvSeEjRBAO72XcenSJy8f7Aw3cT.jpg',
    }, {
      id: 95136, name: 'David Henrie', credit_id: '553a6ffc9251413f5a004022', character: 'Luke Mosby', order: 525, gender: 2, profile_path: '/1NuD0ltILDRRCMfmLPHM8bSfzhb.jpg',
    }],
    name: 'First Time in New York',
    overview: "Robin wants to tell Ted that she loves him, but she can't tell him. Meanwhile, her sister visits and brings her boyfriend, and Robin doesn't know how to react when her sister says she's ready to lose her virginity.",
    id: 62789,
    production_code: '2ALH11',
    season_number: 2,
    still_path: '/4akHg9olflqFFJywm0ar4gMm6Sm.jpg',
    vote_average: 7.4,
    vote_count: 10,
  },
  status: 200,
  statusText: '',
  headers: {
    'cache-control': 'public, max-age=21600', 'content-type': 'application/json;charset=utf-8', etag: 'W/"d11eb5a02bd2116f6ea37e9585df89f2"', 'last-modified': 'Fri, 29 May 2020 19:43:41 GMT',
  },
  config: {
    url: 'https://api.themoviedb.org/3/tv/1100/season/2/episode/12', method: 'get', params: { api_key: config.KEY }, headers: { Accept: 'application/json, text/plain, */*' }, transformRequest: [null], transformResponse: [null], timeout: 0, xsrfCookieName: 'XSRF-TOKEN', xsrfHeaderName: 'X-XSRF-TOKEN', maxContentLength: -1,
  },
  request: {},
};

export default randomSeason2;
