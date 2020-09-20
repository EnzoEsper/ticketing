import axios from 'axios';
import { useState } from 'react';

// custom hook to make it easier to other component to make requests and consume some data of it
export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      // this is for clear and not show the errors before a follow up request
      setErrors(null);

      const response = await axios[method](url, body);

      // if the onSuccess is provided then call it
      if (onSuccess) {
        // the response data provided to the function is not estrictely required but maybe we will need at some time
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
          </ul>
        </div>
      );
    }
  };
  
  return { doRequest, errors };
};