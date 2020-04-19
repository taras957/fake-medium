import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import {CurrentUserContext} from 'context/currentUser'
const FeedToggler = ({tagName}) => {
    const [currentUserState] = useContext(CurrentUserContext);
    return (
      <div className={"feed-toggle"}>
        <ul className="nav nav-pills outline-active">
          {currentUserState.isLoggedIn && (
            <li className="nav-item">
              <NavLink to="/feed" className="nav-link">
                Your Feed
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink to="/" exact className="nav-link">
              Globa Feed
            </NavLink>
          </li>
          {tagName && (
            <li className="nav-item">
              <NavLink to={`/tags/${tagName}`} className="nav-link">
                {`#${tagName}`}
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    );
}

export default FeedToggler
