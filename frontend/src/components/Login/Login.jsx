import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Checkbox, Spin } from "antd";
import "./Login.css";

import { LoginOutlined } from "@ant-design/icons";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import ForgetPassword from "./ForgetPassword";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [available, setAvailable] = useState("");
  const [loading, setLoading] = useState(false); //additional
  const [isError, setIsError] = useState(false);

  const history = useNavigate();

  const loginHandler = async (e) => {
    //handler method for login

    setLoading(true);
    setIsError(false); //additional

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data?.token); //set the browser caching or local storage for globally accessed anywhere in the application
      localStorage.setItem("firstName", data?.firstName);
      localStorage.setItem("lastName", data?.lastName);
      localStorage.setItem("address", data?.address);
      localStorage.setItem("contactNo", data?.contactNo);
      localStorage.setItem("email", data?.email);
      localStorage.setItem("type", data?.type);
      localStorage.setItem("id", data?.id);

      setTimeout(() => {
        // set a 5seconds timeout for authentication

        if (data.type === "admin") {
          history(`/admin-dashboard/${data.firstName}`);
        } else {
          history(`/user-dashboard/${data.firstName}`);
        }

        setLoading(false);
        window.location.reload();
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setAvailable(error.response.data.available);
      setLoading(false);
      setIsError(true);
      setTimeout(() => {
        setError("");
        setAvailable("");
      }, 5000); //5s
    }
  };

  const showPassword = () => {
    //show password method when check box is enabled
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <>
      <div className="login-page">
        <Row>
          <Col className="left-side" xl={15} lg={15} md={24} sm={24}>
            <div className="left-side-inner-wrap">
              <center>
                {error && (
                  <span style={{ color: "white", background: "orange" }}>
                    {error}
                  </span>
                )}
                {available && (
                  <span style={{ color: "white", background: "red" }}>
                    {available}
                  </span>
                )}
              </center>
              <div className="text-block">
                Log in to your account if you already have an account
              </div>
              <Form onFinish={loginHandler}>
                <label>Email</label>
                <Input
                  label={"Email"}
                  name={"email"}
                  fieldType={"email"}
                  size={"large"}
                  placeholder="type your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <Input
                  label={"PASSWORD"}
                  name={"password"}
                  fieldType={"password"}
                  size={"large"}
                  type="password"
                  placeholder="type your password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Checkbox onClick={showPassword}>Show Password</Checkbox>
                <br /> <br /> <br />
                <ForgetPassword />
                <div className="btn-wrap">
                  <center>
                    {isError && (
                      <small style={{ color: "red" }}>
                        Something went wrong. Please try again later.
                      </small>
                    )}
                    {loading ? (
                      <Button
                        label={"SUBMIT"}
                        className="submit-btn"
                        htmlType="submit"
                        type={"primary"}
                        disabled={loading}
                        icon={<Spin />}
                      >
                        &nbsp;Authenticating...
                      </Button>
                    ) : (
                      <Button
                        label={"SUBMIT"}
                        className="submit-btn"
                        htmlType="submit"
                        type={"primary"}
                        icon={<LoginOutlined />}
                        disabled={loading}
                      >
                        SUBMIT
                      </Button>
                    )}
                  </center>
                </div>
              </Form>
              <NavLink to="/register">
                <div className=" text-center top-4 text-lg font-semibold hover:text-blue-700 cursor-pointer hover:underline">
                  Don't have an account? Sign Up
                </div>
              </NavLink>
            </div>
          </Col>
          {/* <Col className="right-side" xl={9} lg={9} md={0} sm={0}>
            {window.innerWidth > 900 && (
              <div
                className="background-img-container"
                style={{ backgroundImage: `url(${LoginLogo})` }}
              />
            )}
          </Col> */}
        </Row>
      </div>
      <br />
      <br />
    </>
  );
};

export default Login;