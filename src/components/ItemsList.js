import React from "react";
import "../index.css"
import { useDispatch } from "react-redux";


import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Button } from "antd";
const { Meta } = Card;

const ItemsList = ({ item }) => {
    //updating the cart
    const dispatch=useDispatch()
    const handleCart = ()=>{
        dispatch({
                      type: "ADDTOCART",
                      payload: item,
                    });
    }
  return (
    <div>
      <Card
        hoverable
        style={{
          width: 240,
          marginBottom: 20,
        }}
        cover={
          <img
            alt="example"
            src={item.image}
            style={{ height: 200 }}
           
          />
        }
        // actions={[
        //     <SettingOutlined key="setting" />,
        //     <EditOutlined key="edit" />,
        //     <EllipsisOutlined key="ellipsis" />,
        //   ]}
      >
        <Meta title={item.name} description={item.status} />
        <div className="item-button">
            <Button onClick={()=>handleCart()} >
                Sell item
            </Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemsList;

//   {/* <Card
//     hoverable
//     style={{ width: 240, marginBottom: 20 }}
//     cover={
//       <img alt="example" src={item.image} style={{ height: 250 }} />
//     }

//     // actions={[
//     //   <SettingOutlined key="setting" />,
//     //   <EditOutlined key="edit" />,
//     //   <EllipsisOutlined key="ellipsis" />,
//     // ]}
//   >
//     <Meta title={item.name} description={item.price} />
//     {/* {
//       function HandleCart() {
//         dispatch({
//           type: "updateCart",
//           payload: item,
//         });
//       }
//     } */}
//     {/* <div className="item-button">
//       {}
//       <Button
//       // onClick={()=>handleCart()}
//       >
//         {" "}
//         Add to Cart
//       </Button>
//     </div> */}
//   {/* </Card> */} */}
