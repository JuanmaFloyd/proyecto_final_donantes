import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SignUp } from "./components/Auth/SignUp";
import { LogIn } from "./components/Auth/LogIn";
import { Auth } from "./components/Middleware/Auth";
import AuthRoutes from "./components/Middleware/AuthRoutes";

function App() {
  return (
    <div>
        <Router>
            <Switch>
                <Route path='/signup' component={SignUp}/>
                <Route path='/login' component={LogIn}/>
                <Auth>
                  <Route path='/' component={AuthRoutes} />
                </Auth>
            </Switch>
        </Router>
    </div> 
  );
}

export default App;
