import { useState, useEffect,useCallback } from "react";
import Axios from "axios";
import useLocalStorage from './useLocalStorage'
export default (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('token')
  const baseUrl = "https://conduit.productionready.io/api";

  const doFetch = useCallback ((options = {}) => {
    setOptions(options);
    setIsLoading(true)
  },[])
  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : "",
        },
      },
    };
    if (!isLoading) return;
    Axios(baseUrl + url, requestOptions)
      .then((res) => {
        setIsLoading(false);
        setResponse(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.response.data);
        setError(error.response.data);
      });
  }, [isLoading, options, url, token]);

  return [{ isLoading, response, error }, doFetch];
};
