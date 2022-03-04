import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Landing from "./Components/Landing";
import CreateRecipe from "./Components/CreateRecipe";
import RecipeDetail from "./Components/RecipeDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route path="/recipe" exact component={CreateRecipe} />
          <Route exact path="/home/:id" component={RecipeDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
