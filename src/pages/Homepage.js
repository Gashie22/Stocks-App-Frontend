import React, { useState } from "react";
import { useEffect } from "react";
import LayoutsPage from "../components/LayoutsPage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Col, Row } from "antd";
// import ProductsData from "../components/ProductsData";
import { type } from "@testing-library/user-event/dist/type";
import ItemsList from "../components/ItemsList";
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

function Homepage() {
  //dispatching the spinner
  const dispatch = useDispatch();
  // API call with useState and useEffect
  const [productData, setproductData] = useState([]);
  //useeffect
  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch({
          type: "SHOW_SPINNER",
        });
        const { data } = await axios.get("http://localhost:5000/api/products");
        setproductData(data);
        dispatch({
          type: "HIDE_SPINNER",
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [dispatch]);

  //categorizing items
  const [categorizing, setCategorizing] = useState("Sportware");
  const categories = [
    {
      name: "Sportware",
      imageurl:
        "https://images.unsplash.com/photo-1601135362309-39ed976cff85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNwb3J0d2VhciUyMHBuZ3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Equipment",
      imageurl:
        "https://images.unsplash.com/photo-1520256862855-398228c41684?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BvcnQlMjBlcXVpcG1lbnQlMjBwbmd8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Accolades",
      imageurl:
        "https://media.istockphoto.com/id/1861025054/photo/trophies-cups-isolated-on-white-transparent-background-winners-podium.webp?b=1&s=170667a&w=0&k=20&c=VH_XonQ8xhMKVt_mRXPuNoaC79NVxUphJWOcDOUdIP0=",
    },
  ];

  //   const handleCart = () => {
  //     dispatch({
  //       type: "updateCart",
  //       payload: productData,
  //     });
  //   };
  return (
    <div>
      <LayoutsPage>
        <div className="d-flex">
          {categories.map((category) => (
            <div
            key={category.name}
            // {console.log(category.name)}
            className={`d-flex category ${
              categorizing === category.name && "category-active"
            }`}
            onClick={() => setCategorizing(category.name)}
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageurl}
              alt={category.name}
              height="40"
              width="60"/>
            </div>
          ))}
        </div>
        <Row>
          {productData.filter((i) => i.category === categorizing)
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemsList key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </LayoutsPage>
    </div>
  );
}

export default Homepage;
