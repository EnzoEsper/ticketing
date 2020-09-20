// if we ever want to include some global css into the project (which bootstrap is) we con only import it into this _app.js file
import 'bootstrap/dist/css/bootstrap.css';

// nexts wraps up each component inside this custom component before showing it
// whenever we try to visit some component, next is going to import that component and passing it into this custom component as the Component prop, 
// and then pagePropos are gonna be the set of components that we possibly pass to the Component   
export default ({ Component, pageProps }) => {
  return(
    <div>
      <h1>Header!</h1>
      <Component {...pageProps} />
    </div>
  );
};