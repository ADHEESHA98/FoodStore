import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Layout,
  Divider,
  Checkbox,
  Spin,
  notification,
  Tooltip,
} from "antd";
import "./Register.css";
// import Logo from "../Dashboard/assets/logo.png";
import RegisterLogo from "../Assets/registerLogo.jpg";

import { FileDoneOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const { Header } = Layout;

const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 16,
  },
};

const Register = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [contactNo, setContactno] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); //additional

  const type = "user";

  const history = useNavigate();

  const registerHandler = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        //use axios API
        "/api/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
          contactNo,
          address,
          type,
        },
        config
      );

      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Register Successfully",
          placement,
        });
        history("/");
      }, 4000); //5seconds timeout
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement,
      });
      setLoading(false);
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

  const [form] = Form.useForm();

  return (
    <>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <center>
            {/* <img src={Logo} style={{ maxWidth: "100px" }} /> */}
            <h1 id="header" style={{ fontFamily: "serif", fontSize: "50px" }}>
              Food Store{" "}
            </h1>

            <Divider />
          </center>
        </Header>
      </Layout>

      <div className="register-page">
        <Row>
          <Col className="left-side" xl={15} lg={15} md={24} sm={24}>
            <div className="left-side-inner-wrap">
              <div className="title">Register</div>
              <Form
                {...layout}
                form={form}
                onFinish={() => registerHandler("top")}
                className="register_form"
              >
                <Form.Item
                  name="first name"
                  label="Firts Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  initialValue={firstName}
                >
                  <Input
                    style={{ width: "450px" }}
                    placeholder="Enter First Name"
                    prefix={
                      <FileDoneOutlined className="site-form-item-icon" />
                    }
                    suffix={
                      <Tooltip title="Please Enter First Name">
                        <InfoCircleOutlined
                          style={{ color: "rgba(0,0,0,.45)" }}
                        />
                      </Tooltip>
                    }
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="last name"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  initialValue={lastName}
                >
                  <Input
                    style={{ width: "450px" }}
                    placeholder="Enter Last Name"
                    prefix={
                      <FileDoneOutlined className="site-form-item-icon" />
                    }
                    suffix={
                      <Tooltip title="Please Enter Last Name">
                        <InfoCircleOutlined
                          style={{ color: "rgba(0,0,0,.45)" }}
                        />
                      </Tooltip>
                    }
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="contact no"
                  label="Contact No"
                  rules={[
                    {
                      required: true,
                      message: "input your Phone Number!",
                    },
                    {
                      min: 10,
                      message: "Phone Number must be minimum 10 characters.",
                    },
                    { max: 10 },
                  ]}
                  initialValue={contactNo}
                >
                  <Input
                    style={{ width: "450px" }}
                    placeholder="Enter Telephone Number"
                    prefix={
                      <FileDoneOutlined className="site-form-item-icon" />
                    }
                    suffix={
                      <Tooltip title="Enter your phone number ex: 0774258796">
                        <InfoCircleOutlined
                          style={{ color: "rgba(0,0,0,.45)" }}
                        />
                      </Tooltip>
                    }
                    showCount
                    maxLength={10}
                    onChange={(e) => setContactno(e.target.value)}
                    type="number"
                  />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  initialValue={address}
                >
                  <Input
                    style={{ width: "450px" }}
                    placeholder="Enter Address"
                    prefix={
                      <FileDoneOutlined className="site-form-item-icon" />
                    }
                    suffix={
                      <Tooltip title="Please Enter Address">
                        <InfoCircleOutlined
                          style={{ color: "rgba(0,0,0,.45)" }}
                        />
                      </Tooltip>
                    }
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="email address"
                  label="Email Address"
                  rules={[
                    {
                      required: true,
                    },
                    { type: "email" },
                    { max: 50 },
                  ]}
                  initialValue={email}
                >
                  <Input
                    style={{ width: "450px" }}
                    placeholder="Enter Email Address"
                    prefix={
                      <FileDoneOutlined className="site-form-item-icon" />
                    }
                    suffix={
                      <Tooltip title="Enter your email ex: example@example.com">
                        <InfoCircleOutlined
                          style={{ color: "rgba(0,0,0,.45)" }}
                        />
                      </Tooltip>
                    }
                    showCount
                    maxLength={50}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  initialValue={password}
                >
                  <Input
                    style={{ width: "450px" }}
                    placeholder="Enter Password"
                    prefix={
                      <FileDoneOutlined className="site-form-item-icon" />
                    }
                    suffix={
                      <Tooltip title="Please Enter Password">
                        <InfoCircleOutlined
                          style={{ color: "rgba(0,0,0,.45)" }}
                        />
                      </Tooltip>
                    }
                    showCount
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </Form.Item>
                <Checkbox className="show_password" onClick={showPassword}>
                  Show Password
                </Checkbox>
                <div className="btn-wrap">
                  <center>
                    {loading ? (
                      <Button
                        label={"SUBMIT"}
                        className="submit-btn"
                        htmlType="submit"
                        type={"primary"}
                        disabled={loading}
                        icon={<Spin />}
                      >
                        &nbsp;Submiting...
                      </Button>
                    ) : (
                      <Button
                        label={"SUBMIT"}
                        className="submit-btn"
                        htmlType="submit"
                        type={"primary"}
                        disabled={loading}
                      >
                        SUBMIT
                      </Button>
                    )}
                  </center>
                </div>
              </Form>
              <NavLink to="/">
                <div className="login_p">Do you have an account? Login</div>
              </NavLink>
            </div>
          </Col>
          <Col className="right-side" xl={9} lg={9} md={0} sm={0}>
            {window.innerWidth > 900 && (
              <div
                className="background-img-container"
                style={{ backgroundImage: `url(${RegisterLogo})` }}
              />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Register;
