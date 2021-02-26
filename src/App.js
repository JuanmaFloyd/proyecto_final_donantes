import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { SignUp } from "./components/Auth/SignUp";
import { Solicitudes } from "./components/Solicitudes";
import { LogIn } from "./components/Auth/LogIn";
import { Auth } from "./components/Middleware/Auth";

function App() {
  return (
    <div>
        <Router>
        <Navbar />
            <Switch>
                <Route path='/signup' component={SignUp}/>
                <Route path='/login' component={LogIn}/>
                <Auth>
                  <Route path='/solicitudes' component={Solicitudes}/> 
                </Auth>
            </Switch>
        </Router>
    </div> 
  );
}

export default App;
