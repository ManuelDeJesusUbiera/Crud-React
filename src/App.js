
import './App.css';
import List from "./Components/List";
import Create from "./Components/Create";
import Edit from "./Components/Edit";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">  
          <nav className="navbar navbar-expand navbar-light bg-light">
              <div className="nav navbar-nav">
                  <Link className="nav-item nav-link active" to={"/"}>Sistem <span className="sr-only"></span></Link>
                  <Link className="nav-item nav-link" to={"/Create"}>Create employee</Link>
              </div>
          </nav>
      

        <Route exact path="/" component={List}></Route>
        <Route path="/Create" component={Create}></Route>
        <Route path="/Edit/:id" component={Edit}></Route>
      </div>
    </Router>
    
  );
}

export default App;
