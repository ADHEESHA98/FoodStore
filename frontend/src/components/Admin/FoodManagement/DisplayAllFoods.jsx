import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, notification, message } from "antd";
import axios from "axios";
import "./food.css";

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}

const DisplayAllFoods = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  const history = useNavigate();

  useEffect(() => {
    (async () => {
      await fetch("/food/getFood")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoader(!loader);
        });
    })();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/food/deleteFood/${id}`);
      notification.info({
        title: "Delete Form",
        message: "Successfully Delete the food",
        placement: "top",
      });
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const columns = [
    {
      title: "Food Category",
      dataIndex: "foodCategory",
      sorter: (a, b) => a.foodCategory.length - b.foodCategory.length,
      with: 150,
      filters: [
        {
          text: "Fruits",
          value: "fruits",
        },
        {
          text: "Vegetables",
          value: "vegetables",
        },
        {
          text: "Meat",
          value: "meat",
        },
        {
          text: "Fish",
          value: "fish",
        },
        {
          text: "Drinks",
          value: "drink",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) =>
        record.foodCategory.toLowerCase().indexOf(value) === 0,
    },
    {
      title: "Food Name",
      dataIndex: "foodName",
      sorter: (a, b) => a.foodName.length - b.foodName.length,
      sortDirections: ["descend"],
      width: 250
    },
    {
      title: "Food Price",
      dataIndex: "foodPrice",
      sorter: (a, b) => a.foodPrice.length - b.foodPrice.length,
      width: 150
    },
    {
      title: "Food Description",
      dataIndex: "foodDescription",
      sorter: (a, b) => a.foodDescription.length - b.foodDescription.length,
    },
    {
      title: "Action",
      render: (record) => (
        <div className="food_action_btn">
          <div>
            <Button
              style={{ background: "red", color: "white" }}
              onClick={() => deleteHandler(record._id)}
            >
              Delete
            </Button>
          </div>
          <div>
            <Button
              style={{ background: "green", color: "white" }}
              //   onClick={() => deleteHandler(record._id)}
            >
              Update
            </Button>
          </div>
        </div>
      ),
      width: 200,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      loading={loader}
      pagination={{ pageSize: 6 }}
      sticky
    />
  );
};

export default DisplayAllFoods;
