import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import PrivateRoute from "./components/Routes/PrivateRoutes";
import UserDashbord from "./components/User/UserDashbord";
import UserNavBar from "./components/User/UserNavBar";
import ViewCart from "./components/User/ViewCart/ViewCart";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin-dashboard/:firstName"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard/:firstName"
            element={
              <PrivateRoute>
              {[<UserNavBar/>,<UserDashbord />]}
              </PrivateRoute>
            }
          />
           <Route
            path="/user-dashboard/:firstName/viewcart"
            element={
              <PrivateRoute>
                <UserNavBar />
                <ViewCart />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
