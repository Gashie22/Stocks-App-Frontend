import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LayoutsPage from "../components/LayoutsPage";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Table, Modal, Form, Input, Select, message } from "antd";

const ProductsPage = () => {
  //dispatching the spinner
  const dispatch = useDispatch();
  // API call with useState and useEffect
  const [productData, setproductData] = useState([]);

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

  //useeffect
  useEffect(() => {
    getProducts();
  }, []);
  //modal states
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  //delete function
  const HandleDelete= async(record)=>{
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post("http://localhost:5000/api/delete", { itemId: record._id });
      message.success("Item Deleted Succesfully");
      getProducts();
      setPopupModal(false);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height={60} width={60} />
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (image, record) => (
        <div>
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItem(record);
              setPopupModal(true);
            }}
          />
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              HandleDelete(record)
            }}
          />
        </div>
      ),
    },
  ];

  //handlSubmit function
  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        //adding item into database
        const res = await axios.post(
          "http://localhost:5000/api/addproduct",
          value
        );
        message.success("Item Added Succesfully");
        getProducts();
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something Went Wrong");
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.put("http://localhost:5000/api/update", {
          ...value,
          itemId: editItem._id,
        });
        message.success("Item Updated Succesfully");
        getProducts();
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something Went Wrong");
        console.log(error);
      }
    }
  };

  return (
    <LayoutsPage>
      <div className="d-flex justify-content-between">
        <h1>Stocks Inventory</h1>
        <Button type="primary" onClick={() => setPopupModal(true)}>
          Add Item
        </Button>
      </div>
      <Table className="striped" columns={columns} dataSource={productData} />
      {
        popupModal && (
            <Modal
            title={`${editItem !== null ? "Edit item" : "Add new item"}`}
            open={popupModal}
            onCancel={() => {
                setEditItem(null);
                setPopupModal(false);
            }}
          >
            <Form
              layout="vertical"
              initialValues={editItem}
              onFinish={handleSubmit}
            >
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="quantity" label="Quantity">
                <Input />
              </Form.Item>
              <Form.Item name="price" label="Price">
                <Input />
              </Form.Item>
              <Form.Item name="status" label="Status">
                <Select>
                  <Select.Option value="In Stock">In Stock</Select.Option>
                  <Select.Option value="Out of Stock">Out of Stock</Select.Option>
                  <Select.Option value="Not Certain">Not Certain</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="image" label="Image URL">
                <Input />
              </Form.Item>
              <Form.Item name="category" label="Category">
                <Select>
                  <Select.Option value="Sportware">Sportware</Select.Option>
                  <Select.Option value="Equipment">Equipment</Select.Option>
                  <Select.Option value="Medal">Accolades</Select.Option>
                </Select>
              </Form.Item>
    
              <div className="d-flex justify-content-end">
                <Button type="primary" htmlType="submit">
                  SAVE
                </Button>
              </div>
            </Form>
          </Modal>

        )
      }
     
    </LayoutsPage>
  );
};

export default ProductsPage;
