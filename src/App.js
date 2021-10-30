import "./App.css";
import SearchPage from "./Components/SearchedPage/SearchPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Single from "./Components/Single/Single";
import NotFound from "./Components/NotFound";

function App() {
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
