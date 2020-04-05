import  { useEffect, useContext } from "react";
import useFetch from 'hooks/use-fetch'
import {CurrentUserContext} from "context/currentUser";
import useLocalStorage from 'hooks/useLocalStorage';
const CurrenUserChecker = ({children}) => {
    const [, setCurrentUserState] = useContext(CurrentUserContext);
    const [{response}, doFetch] =useFetch('/user')
    const [token] = useLocalStorage('token')
    useEffect(() => {
      if (!token) {
        setCurrentUserState((state) => ({
          ...state,
          isLoggedIn: false,
        }));
        return;
      }
      doFetch();
      setCurrentUserState((state) => ({
        ...state,
        isLoading: true,
      }));
    }, [token, setCurrentUserState, doFetch]);
    useEffect(() => {
      if (!response) return;
      console.log(response.user);
      setCurrentUserState((state) => ({
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: response.user,
      }));
    }, [response, setCurrentUserState]);
    return children
}

export default CurrenUserChecker
