import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin, Tooltip, notification, Select } from "antd";

import { FileDoneOutlined, InfoCircleOutlined } from "@ant-design/icons";

import axios from "axios";
import "./food.css";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AddFoods = () => {
  const [loader, setLoader] = useState(false);
  const [foodCategory, setFoodCategory] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodDescription, setFoodDescription] = useState("");

  const [loading, setLoading] = useState(false); //additional
  const [error, setError] = useState(false);

  const history = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 2000);
  }, []);

  const onchangeFoodCategory = (e) => {
    setFoodCategory(e);
  };

  const createHandler = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(
        //use axios API
        "/food/createFood",
        {
          foodCategory,
          foodName,
          foodPrice,
          foodDescription,
        },
        config
      );

      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully added the food details..",
          placement,
        });
        form.resetFields();
        history(
          `/admin-dashboard/${localStorage.getItem("firstName")}?_optFood=food`
        );
      }, 3000); //5seconds timeout
     
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement,
      });
      setError(true);
      form.resetFields();
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <>
          <div>
            <Button
              onClick={() =>
                history(
                  `/admin-dashboard/${localStorage.getItem(
                    "firstName"
                  )}?_optFood=food`
                )
              }
              type="primary"
            >
              Back
            </Button>
          </div>
          <div className="add_food_form">
            <Form
              {...layout}
              form={form}
              name="control-hooks"
              onFinish={() => createHandler("top")}
            >
              <center>
                {error && <span style={{ color: "red" }}>{error}</span>}
              </center>
              <Form.Item
                name="food catergory"
                label="Food Catergory"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select Food Catregory"
                  style={{ width: "80%" }}
                  onChange={onchangeFoodCategory}
                >
                  <Option value="fruits">Fruits</Option>
                  <Option value="vegetables">Vegetables</Option>
                  <Option value="meat">Meat</Option>
                  <Option value="fish">Fish</Option>
                  <Option value="drinks">Drinks</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="food name"
                label="Food Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
                initialValue={foodName}
              >
                <Input
                  style={{ width: "80%" }}
                  placeholder="Enter Food Name"
                  prefix={<FileDoneOutlined className="site-form-item-icon" />}
                  suffix={
                    <Tooltip title="Please Enter Food Name">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="food price"
                label="Food Price"
                rules={[
                  {
                    required: true,
                  },
                ]}
                initialValue={foodPrice}
              >
                <Input
                  style={{ width: "80%" }}
                  placeholder="Enter Food Price"
                  prefix={<FileDoneOutlined className="site-form-item-icon" />}
                  suffix={[
                    <Tooltip title="Please Enter Food Price">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>,
                  ]}
                  onChange={(e) => setFoodPrice(e.target.value)}
                  type="number"
                />
              </Form.Item>
              <Form.Item
                name="food description"
                label="Food Description"
                rules={[
                  {
                    required: true,
                  },
                ]}
                initialValue={foodDescription}
              >
                <Input
                  style={{ width: "80%" }}
                  placeholder="Enter Food Description"
                  prefix={<FileDoneOutlined className="site-form-item-icon" />}
                  suffix={[
                    <Tooltip title="Please Enter Food Description">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>,
                  ]}
                  onChange={(e) => setFoodDescription(e.target.value)}
                />
              </Form.Item>
              <Form.Item {...tailLayout}>
                &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                <center>
                  <Button type="primary" htmlType="submit">
                    {loading ? (
                      <>
                        <Spin /> Submiting..
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>{" "}
                  &nbsp;&nbsp;
                  <Button htmlType="button" onClick={onReset}>
                    Reset
                  </Button>
                </center>
              </Form.Item>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default AddFoods;
