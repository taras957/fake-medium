import { useEffect, useContext } from "react";
import useFetch from "hooks/use-fetch";
import { CurrentUserContext } from "context/currentUser";
import useLocalStorage from "hooks/useLocalStorage";
const CurrenUserChecker = ({ children }) => {
  const [, dispatch] = useContext(CurrentUserContext);
  const [{ response }, doFetch] = useFetch("/user");
  const [token] = useLocalStorage("token");
  useEffect(() => {
    if (!token) {
      dispatch({ type: "SET_ANAUTHORIZED" });
      return;
    }
    doFetch();
    dispatch({ type: "LOADING" });
  }, [token, dispatch, doFetch]);
  useEffect(() => {
    if (!response) return;
    console.log(response.user);
    dispatch({ type: "SET_AUTHORIZED", payload: response.user });
  }, [response, dispatch]);
  return children;
};

export default CurrenUserChecker;
