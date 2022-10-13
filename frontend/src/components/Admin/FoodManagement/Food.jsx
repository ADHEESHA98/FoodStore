import React, { useState, useEffect } from "react";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import DisplayAllFoods from "./DisplayAllFoods";
import "./food.css";

const Food = () => {
  const [loader, setLoader] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 3000);
  }, []);

  return (
    <div>
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <>
          <DisplayAllFoods />
          <Button
            className="add_food_btn"
            onClick={() =>
              history(
                `/admin-dashboard/${localStorage.getItem(
                  "firstName"
                )}?_food=addFood`
              )
            }
            type="primary"
          >
            Add Foods
          </Button>
        </>
      )}
    </div>
  );
};

export default Food;
