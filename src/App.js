import "./App.css";
import { Button } from "antd";
import Landing from "./components/Screens/Landing";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import About from "./components/Screens/About";
import Galleryx from "./components/Screens/Galleryx";
import Rules from "./components/Screens/Rules";
import Contact from "./components/Screens/Contact";
import Login from "./components/Screens/Login";
import Signup from "./components/Screens/Signup";
import Downloads from "./components/Screens/Downloads";
import Home from "./components/Screens/Admin/Home";
import Teamview from "./components/Screens/Admin/Teamview";
import Report from "./components/Screens/Report";
import firebaseapp from "./Firebase/init";
import "react-toastify/dist/ReactToastify.css";

//context
import { createContext, useContext, useState, useReducer } from "react";
import { mainreducer, initalstate } from "./Context/index";
import Queries from "./components/Screens/Admin/Queries";
import Dashboard from "./components/Screens/Dasboard";
import SEVCLogin from "./components/Screens/SEVCLogin";
import EKVCLogin from "./components/Screens/EKVCLogin";
export const Context = createContext();

function App() {
  const [state, dispatch] = useReducer(mainreducer, initalstate);
  return (
    <Context.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/gallery" exact element={<Galleryx />} />
          <Route path="/rules" exact element={<Rules />} />
          <Route path="/contactus" exact element={<Contact />} />
          <Route path="/sevcLogin" exact element={<SEVCLogin/>} />
          <Route path="/ekvcLogin" exact element={<EKVCLogin/>} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/downloads" exact element={<Downloads />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/reports" exact element={<Report />} />

          <Route path="/admin/" exact element={<Home />} />
          <Route path="/admin/queries" exact element={<Queries />} />
          <Route
            path="/admin/teamview/:teamname"
            exact
            element={<Teamview />}
          />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
