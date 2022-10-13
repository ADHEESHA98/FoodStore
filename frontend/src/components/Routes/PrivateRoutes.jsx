import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";

//private route logic
function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  if (localStorage.getItem("authToken") === "null") {
    return loading ? (
      <center>
        <div style={{marginTop: "280px"}}>
          <h1 style={{ color: "red" }}>UnAuthorized Access...</h1>
          <p>Redirecting back to the login 👉</p>
          <Spin size="large" />
        </div>
      </center>
    ) : (
      <Navigate to="/login" />
       //if user not login or not authorized to the restricted routes, it may be navigated to the login
    );
  }
  return children;
}

export default PrivateRoute;