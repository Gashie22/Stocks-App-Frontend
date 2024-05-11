import React, { useState } from "react";
import { useEffect } from "react";
import LayoutsPage from "../components/LayoutsPage";
import axios from "axios";
import "../index.css";
import { useDispatch } from "react-redux";
import { Col, Row } from "antd";
// import ProductsData from "../components/ProductsData";
import { Card, Button } from "antd";
import { type } from "@testing-library/user-event/dist/type";
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const dispatch = useDispatch;
function Homepage() {
  // API call with useState and useEffect
  const [productData, setproductData] = useState([]);
  //useeffect
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setproductData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const { Meta } = Card;
  const handleCart = () => {
    dispatch({
      type: "updateCart",
      payload: productData,
    });
  };
  return (
    <div>
      <LayoutsPage>
        <Row>
          {productData.map((item, index) => (
            <Col key={item.price} xs={24} lg={6} md={12} sm={6}>
              <Card
                hoverable
                style={{ width: 240, marginBottom: 20 }}
                cover={
                  <img alt="example" src={item.image} style={{ height: 250 }} />
                }

                // actions={[
                //   <SettingOutlined key="setting" />,
                //   <EditOutlined key="edit" />,
                //   <EllipsisOutlined key="ellipsis" />,
                // ]}
              >
                <Meta title={item.name} description={item.price} />
                {/* {
                  function HandleCart() {
                    dispatch({
                      type: "updateCart",
                      payload: item,
                    });
                  }
                } */}
                <div className="item-button">
                  {}
                  <Button
                    // onClick={()=>handleCart()}
                  >
                    {" "}
                    Add to Cart
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </LayoutsPage>
    </div>
  );
}

export default Homepage;
