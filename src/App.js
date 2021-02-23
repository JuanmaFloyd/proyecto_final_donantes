import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SignUp } from "./components/SignUp";

function App() {
  return (
    <div>
          <Router>
              <Switch>
                  <Route path='/signup' component={SignUp}/> 
              </Switch>
          </Router>
      </div> 
  );
}

export default App;
