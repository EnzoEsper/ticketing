const LandingPage = ({ color }) => {
  console.log(`I am in the comoponent ${color}`);
  return <h1>Landing Page</h1>;
};

// This is gonna be executed during the server side rendering process, this function is where we are going to attempt to fetch some data 
// specifically for doing some initial rendering of the app. Any data that is returned from this function is gonna show up inside the component.
// If we need to fetch some data during the ssr process, WE HAVE TO DO IT INSIDE getInitialProps and we can not do it inside of the component. 
LandingPage.getInitialProps = () => {
  console.log(`I am on the server!`);

  return { color: 'red' };
};

export default LandingPage;