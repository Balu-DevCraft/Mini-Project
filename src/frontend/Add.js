import React, { useState } from "react";
import { Form, Input, InputNumber, Button, message, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const AddItem = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Handle file change, including validation
  const handleFileChange = (info) => {
    const uploadedFile = info.file; // Extract file object
    console.log("info", uploadedFile);

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    // Validate file type
    const isValidType = allowedTypes.includes(uploadedFile.type);

    if (!isValidType) {
      message.error(
        `${uploadedFile.name} is not a valid image file (only .jpg, .jpeg, and .png are allowed).`
      );
      return;
    }

    setFile(uploadedFile); // Set the valid file to state
    message.success(`${uploadedFile.name} is ready for upload.`);
  };

  // Handle form submit
  const handleSubmit = async (values) => {
    if (!file) {
      message.error("Please upload an image file.");
      return;
    }

    try {
      // Create FormData object and append the file and other form data
      const formData = new FormData();
      formData.append("img", file); // Attach the image file
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value); // Attach other form data (certificateId, name, etc.)
      });
      console.log("dat", formData);

      // Submit the form data (with file) via POST request
      const response = await axios.post("http://localhost:3000/api/addItem", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
       
        
      });

      // Handle success and error responses
      if (response.status === 201) {
        console.log("responce",response)
        message.success("Item submitted successfully!");
        navigate("/Mainpage"); // Redirect to items page after successful submission
      } else {
        message.error(response.data.message || "Failed to submit item.");
      }
    } catch (error) {
      console.error("Error submitting item:", error);
      message.error("An error occurred while submitting the item.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Add New Item</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{
          maxWidth: 600,
          margin: "auto",
          padding: "20px",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
        }}
      >
        {/* Certificate ID Input */}
        <Form.Item
          label="Certificate ID"
          name="certificateId"
          rules={[{ required: true, message: "Please enter the certificate ID" }]}
        >
          <Input placeholder="Enter Certificate ID" />
        </Form.Item>

        {/* Name Input */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input placeholder="Enter Name" />
        </Form.Item>

        {/* Year Input */}
        <Form.Item
          label="Year"
          name="year"
          rules={[{ required: true, message: "Please enter the year" }]}
        >
          <InputNumber placeholder="Enter Year" style={{ width: "100%" }} />
        </Form.Item>

        {/* Description Input */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea placeholder="Enter Description" rows={4} />
        </Form.Item>

        {/* Price Input */}
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <InputNumber placeholder="Enter Price" style={{ width: "100%" }} />
        </Form.Item>

        {/* Unique Code Input */}
        <Form.Item
          label="Unique Code"
          name="uniqueCode"
          rules={[{ required: true, message: "Please enter a unique code" }]}
        >
          <Input placeholder="Enter Unique Code" />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item label="Image Upload" name="img">
          <Upload
            beforeUpload={() => false} // Prevent auto-upload
            onChange={handleFileChange} // Handle file change
            maxCount={1} // Limit to one file
            accept="image/jpeg,image/png,image/jpg" // Allow only specific image types
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Item
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddItem;
