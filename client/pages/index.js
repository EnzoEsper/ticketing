import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

// This is gonna be executed during the server side rendering process (can be executed in the browser under very particular circumstances), 
// this function is where we are going to attempt to fetch some data specifically for doing some initial rendering of the app. 
// Any data that is returned from this function is gonna show up inside the component.
// If we need to fetch some data during the ssr process, WE HAVE TO DO IT INSIDE getInitialProps and we can not do it inside of the component. 
LandingPage.getInitialProps = async () => {
  // we can not use the useRequest custom hook inside here, bc hooks are used iside of react components and this is a plain function (and require to inmediately return some data)
  
  if (typeof window === 'undefined') {
    // we are on the server -> requests should be made to 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
    const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
      headers: {
        Host: 'ticketing.dev'
      }
    });
    
    return data;
  } else {
    // we are on the browser -> request can be made with a base url of '' and rely upon the browser to put on the base domain for us
    const { data } = await axios.get('/api/users/currentuser');
    return data;
  }

  return {}
};

export default LandingPage;