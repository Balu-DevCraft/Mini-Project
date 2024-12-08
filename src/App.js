import "./App.css";
import Header from "./frontend/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./frontend/Login";
import Home from "./frontend/Home";
import Footer from "./frontend/Footer";
import Register from "./frontend/Register";
import Verifier from "./frontend/Verifier";
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import VerifierDashboard from "./frontend/VerifierDashboard";
import Mainpage from "./frontend/Mainpage";
import Add from "./frontend/Add";
import Edit from "./frontend/Edit";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header></Header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Verifier" element={<Verifier/>}/>
            <Route path="/VerifierDashboard" element={<VerifierDashboard/>}/>
            <Route path="/Mainpage" element={<Mainpage />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit" element={<Edit />} />




          </Routes>

          <Footer></Footer>
        </Router>
      </header>
    </div>
  );
}

export default App;
