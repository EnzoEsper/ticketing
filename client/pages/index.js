import buildClient from '../api/buildClient';

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>;
};

// This is gonna be executed during the server side rendering process (can be executed in the browser under very particular circumstances), 
// this function is where we are going to attempt to fetch some data specifically for doing some initial rendering of the app. 
// Any data that is returned from this function is gonna show up inside the component.
// If we need to fetch some data during the ssr process, WE HAVE TO DO IT INSIDE getInitialProps and we can not do it inside of the component. 
LandingPage.getInitialProps = async (context) => {
  // we can not use the useRequest custom hook inside here, bc hooks are used iside of react components and this is a plain function (and require to inmediately return some data)
  // creating the client depending on the environment/context in which the request is trigered (server or browser) and passing the data fetched in the ssr process to the component
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;