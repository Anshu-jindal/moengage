import { useState } from "react";
import "./App.css";
import SearchPage from "./Components/SearchedPage/SearchPage";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Single from "./Components/Single/Single";
import NotFound from "./Components/NotFound";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  let cnt = 1;
  let url =
    "https://api.aniapi.com/v1/oauth?response_type=token&client_id=38dbd79d-25ed-481a-928a-cc2821e93876&redirect_uri=http://localhost:3000/&state=cdnvkjfkjvnjfnvnj";

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <NotFound />
        </Route>
        <Route path="/search" exact>
          <SearchPage />
        </Route>
        <Route path="/:slug" exact component={Single} />
      </Switch>
    </Router>
  );
}

export default App;
