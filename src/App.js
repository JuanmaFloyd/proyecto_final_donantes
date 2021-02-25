import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { Solicitudes } from "./components/Solicitudes";

function App() {
  return (
    <div>
          <Router>
              <Switch>
                  <Route path='/signup' component={SignUp}/>
                  <Route path='/solicitudes' component={Solicitudes}/> 
              </Switch>
          </Router>
      </div> 
  );
}

export default App;
