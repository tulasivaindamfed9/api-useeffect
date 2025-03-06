import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./components/Login/Login"
import Homepage from "./components/Homepage/Homepage"

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/Homepage" element={<Homepage/>}></Route>
    </Routes>
   </Router>
  );
}

export default App;
