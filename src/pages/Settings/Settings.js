import React, { useContext, useState, useEffect } from "react";
import useFetch from 'hooks/use-fetch'
import { CurrentUserContext } from 'context/currentUser'
import BackendErrorMessages from 'pages/Authentication/components/BackendErrorMessages';
import useLocalStorage from "hooks/useLocalStorage";
import { Redirect } from "react-router-dom";

const Settings = () => {
    const [currentUserState,dispatch] = useContext(CurrentUserContext);
    const apiUrl = '/user'
    const [,setToken] = useLocalStorage('token')
    const [{ response, error }, doFetch] = useFetch(apiUrl);
    const [image, setImage ] = useState('')
    const [userName, setUserName] = useState("");
    const [biography, setBiography] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[isSuccessfullLogout, SetIsSuccessfullLogout]=useState(false)


    const handleSubmit =(e)=> {
        e.preventDefault()
        doFetch({
            method: 'put',
            data: {
                ...currentUserState.currentUser,
                image,
                userName,
               bio: biography,
                email,
                password
            }
        })

    }

    const logout =(e) => {
        e.preventDefault()
        setToken('')
        dispatch({type:"LOGOUT"})
        SetIsSuccessfullLogout(true)

    }

    useEffect(() => {
       if(!currentUserState.currentUser){
           return
       }
       setImage(currentUserState.currentUser.image);
       setUserName(currentUserState.currentUser.username);
       setBiography(currentUserState.currentUser.bio);
       setEmail(currentUserState.currentUser.email);
    }, [currentUserState.currentUser])


    useEffect(() => {
      if (!response) {
        return;
      }
      dispatch({ type: "SET_AUTHORIZED", payload: response.user });
    }, [response, dispatch]);


    if (isSuccessfullLogout){
      return  <Redirect to='/'/>
    }
      return (
        <div className="settings-page">
          <div className="container page">
            <div className="row">
              <div className="col col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Your settings</h1>
                {error && <BackendErrorMessages backendErrors={error.errors} />}
                <form onSubmit={handleSubmit}>
                  <fieldset>
                    <fieldset className="form-group">
                      <input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        type="text"
                        className="form-control form-control-lg'"
                        placeholder="URL of profile picture"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        type="text"
                        className="form-control form-control-lg'"
                        placeholder="Username"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <textarea
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                        className="form-control form-control-lg"
                        rows="8"
                        placeholder="short biography"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        className="form-control form-control-lg'"
                        placeholder="Email"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control form-control-lg'"
                        placeholder="Password"
                      />
                    </fieldset>
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary pull-xs-right"
                    >
                      Update Settings
                    </button>
                  </fieldset>
                </form>
                <hr />
                <button className="btn btn-outline-danger" onClick={logout}>
                  Click here to logout{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Settings
