import axios from 'axios';

// helper function to build a pre-configured version of axios that works with either the browser or the server
export default ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  } else {
    // we are on the browser
    return axios.create({
      baseURL: '/'  // we really dont need a base url inside the browser, we probably dont need this entirely
    })
  }
}