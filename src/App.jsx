import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./components/home/Home.jsx";
import Collection from "./components/collection/Collection.jsx";
import Auth from "./components/auth/Auth.jsx";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  )
}

export default App
