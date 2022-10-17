import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import "./style.css";

const UserDashbord = () => {
  const [data, setData] = useState([]);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    (async () => {
      await axios
        .get("/food/getFood")
        .then((res) => setData(res.data))
        .catch((error) => alert(error));
    })();

    setTimeout(() => setSpin(true), 3000);
  }, []);

  const addToCart = async (value) => {
    const foodName = value.foodName;
    const foodCategory = value.foodCategory;
    const foodPrice = value.foodPrice;
    const foodDescription = value.foodDescription;
    try {
      await axios.post("/cart/createCart", {
        foodCategory,
        foodName,
        foodPrice,
        foodDescription,
      });
      alert("Successfully Added to the cart");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {spin === false ? (
        <center>
          <div className=" my-56">
            <Spin size="large" />
          </div>
        </center>
      ) : (
        <section class="text-gray-600 body-font">
          <div class="container px-5 mx-auto">
            <div class="flex flex-wrap -m-4 ">
              {data.map((value, index) => {
                return (
                  <div class="p-4 mt-10">
                    <div class="h-56  bg-opacity-75 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 pt-2 rounded-lg overflow-hidden text-center relative">
                      <div>
                        <img
                          class="lg:h-28 md:h-20 w-full object-cover object-center"
                          src="https://dummyimage.com/720x400"
                          alt="blog"
                        />
                      </div>
                      <h1 class="title-font sm:text-xl text-lg font-medium text-slate-900 mb-3">
                        {value.foodName}
                      </h1>
                      <p className="f_description">
                        {value.foodDescription}
                      </p>
                    </div>
                    <div className=" flex justify-between">
                      <h2 class="tracking-widest text-base title-font font-medium text-red-600 mb-1">
                        Quantity: {value.productQty}
                      </h2>
                      <h2 class="tracking-widest text-base title-font font-medium text-red-600 mb-1">
                        LKR, {Number(value.foodPrice)}.00
                      </h2>
                    </div>
                    <div>
                      <button
                        className=" mx-auto mb-4 btn"
                        onClick={() => addToCart(value)}
                      >
                        <span class="text spaan">Add to Cart</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UserDashbord;