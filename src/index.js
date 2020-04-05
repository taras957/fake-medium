import React from "react";
import ReactDOM from "react-dom";
import Routs from "./Routs";
import { BrowserRouter as Router} from 'react-router-dom'
import TopBar from "./components/TopBar/TopBar";
import { CurrentUserProvider } from "./context/currentUser";
import CurrenUserChecker from "components/CurrentUserChecker/CurrenUserChecker";

const App = () => {
    return (
      <CurrentUserProvider>
        <CurrenUserChecker>
          <Router>
            <TopBar />
            <Routs />
          </Router>
        </CurrenUserChecker>
      </CurrentUserProvider>
    );
}
ReactDOM.render(<App />, document.getElementById("root"));
