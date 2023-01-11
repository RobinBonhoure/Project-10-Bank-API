import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import User from './pages/User.jsx'
import Footer from "./components/Footer"
import Header from "./components/Header"
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/user" element={<User />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
