// if we ever want to include some global css into the project (which bootstrap is) we con only import it into this _app.js file
import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

// nexts wraps up each component inside this custom component before showing it
// whenever we try to visit some component, next is going to import that component and passing it into this custom component as the Component prop, 
// and then pagePropos are gonna be the set of components that we possibly pass to the Component   
const AppComponent = ({ Component, pageProps }) => {
  return(
    <div>
      <h1>Header!</h1>
      <Component {...pageProps} />
    </div>
  );
};

// the argument received in this get initialProps function is different from the argument received in the components (the contexts are different).
AppComponent.getInitialProps = async (appContext) => {
  // we can not use the useRequest custom hook inside here, bc hooks are used iside of react components and this is a plain function (and require to inmediately return some data)
  // creating the client depending on the environment/context in which the request is trigered (server or browser) and passing the data fetched in the ssr process to the component
  console.log(appContext);
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  // trying to obtain the data that we try to fetch inside the getInitialProps function of each COMPONENT (page)
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  console.log(pageProps);

  return data;
};

export default AppComponent;
