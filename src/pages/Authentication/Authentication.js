import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import useFetch from "hooks/use-fetch.js";
  import { CurrentUserContext } from "context/currentUser";
import useLocalStorage from 'hooks/useLocalStorage.js'
import BackendErrorMessages from './components/BackendErrorMessages'
const Authentication = ({ match }) => {
  const isLogin = match.path === "/login";
  const pageTitle = isLogin ? "Sign In" : "Sign Up";
  const desciptionLink = isLogin ? "/register" : "/login";
  const descriptionText = isLogin ? "Need an account?" : "Have an account";
  const apiUrl = isLogin? '/users/login': '/users'
  const  [isSuccessfullSubmit, setisSuccessfullSubmit] =useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState('')
  const [{ response, isLoading,error}, doFetch] = useFetch(apiUrl);
  const [, setToken] = useLocalStorage('token')
  const [, dispatch] = useContext(
    CurrentUserContext
  );
  

  
  const handleSubmit = e => {
    e.preventDefault();
    const user = isLogin ? {email,password} : {email, password,username}
    doFetch({
      method: "post",
      data: { user: user }
    });
  };
  useEffect(() => {
    if (!response) return;
    setToken(response.user.token);
    setisSuccessfullSubmit(true);

    dispatch({ type: "SET_AUTHORIZED", payload: response.user });
  }, [response, setToken, dispatch]);

  if (isSuccessfullSubmit) {
   return  <Redirect to="/" />;
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={desciptionLink}>{descriptionText}</Link>
            </p>
            <form onSubmit={e => handleSubmit(e)}>
                {error && <BackendErrorMessages backendError = {error.errors}/>}
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  disabled={isLoading}
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
