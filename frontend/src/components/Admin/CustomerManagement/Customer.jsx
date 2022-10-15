import { Card, Col, Row, Spin, notification, Button, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const Customer = () => {
  const [data, setData] = useState([]);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    (async () => {
      await axios
        .get("/api/auth/getUser")
        .then((res) => setData(res.data))
        .catch((error) => alert(error));
    })();

    setTimeout(() => setSpin(true), 3000);
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/auth/deleteUser/${id}`);
      notification.info({
        title: "Delete Form",
        message: "Successfully Delete",
        placement: "top",
      });
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const filterData = data.filter((el) => el.type === "user");

  console.log(filterData);

  return (
    <>
      {spin === false ? (
        <center className="spin">
          <div>
            <Spin />
          </div>
        </center>
      ) : (
        <div className="site-card-wrapper">
          <Row gutter={[16, 16]}>
            {filterData.map((value) => {
              return (
                <Col span={8}>
                  <Card
                    title={
                      <>
                        {" "}
                        <Avatar size={64} icon={<UserOutlined />} />
                      </>
                    }
                  >
                    <div className="card_details">
                      <div>First Name</div>
                      <div>{value.firstName}</div>
                    </div>
                    <div className="card_details">
                      <div>Last Name</div>
                      <div>{value.lastName}</div>
                    </div>
                    <div className="card_details">
                      <div>Contact Number</div>
                      <div>{value.contactNo}</div>
                    </div>
                    <div className="card_details">
                      <div>Address</div>
                      <div>{value.address}</div>
                    </div>
                    <div className="cus_delete_btn">
                      {" "}
                      <Button
                        type="danger"
                        onClick={() => deleteHandler(value._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </>
  );
};

export default Customer;
