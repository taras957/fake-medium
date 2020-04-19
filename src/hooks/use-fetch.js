import { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import useLocalStorage from "./useLocalStorage";
export default (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage("token");
  const baseUrl = "https://conduit.productionready.io/api";

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);
  useEffect(() => {
    let skipGetDestroyAFterResponse = false;
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
        if (!skipGetDestroyAFterResponse) {
          setIsLoading(false);
          setResponse(res.data);
        }
      })
      .catch((error) => {
        if (!skipGetDestroyAFterResponse) {
          setIsLoading(false);
          setError(error?.response?.data);
        }

        return ()=> {
          skipGetDestroyAFterResponse = true; 
        }

      });
  }, [isLoading, options, url, token]);

  return [{ isLoading, response, error }, doFetch];
};
