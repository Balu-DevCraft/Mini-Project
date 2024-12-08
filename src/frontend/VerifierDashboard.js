import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Spin } from "antd";
import "./VerifierDashboard.css";

const { Meta } = Card;

const VerifierDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getPendingItems");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Handle verification (Approve/Reject)
  const handleVerify = async (itemId, status) => {
    try {
      if (status === "approved") {
        await axios.post("http://localhost:3000/approveItem", { itemId });
        setItems(items.filter((item) => item._id !== itemId)); // Remove approved item from the list
        alert("Item approved successfully.");
      } else if (status === "rejected") {
        await axios.delete(`http://localhost:3000/rejectItem/${itemId}`);
        setItems(items.filter((item) => item._id !== itemId)); // Remove rejected item from the list
        alert("Item rejected and deleted successfully.");
      }
    } catch (error) {
      console.error(`Error updating item status (${status}):`, error);
      alert(`Failed to ${status} item.`);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <p>Loading items...</p>
      </div>
    );
  }

  return (
    <div className="container p-5 mt-5">
      <h1 className="text-center">Verifier Dashboard</h1>
      {items.length === 0 ? (
        <p className="text-center">No items pending verification.</p>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {items.map((item) => (
            <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
              <Card
                hoverable
                style={{ borderRadius: "10px", overflow: "hidden" }}
                cover={<img alt={item.name} src={item.img || "default-image.jpg"} />}
              >
                <Meta title={item.name} description={item.description} />
                <p>
                  <strong>Unique Code:</strong> {item.uniqueCode}
                </p>
                <div className="card-actions">
                  <Button
                    type="primary"
                    onClick={() => handleVerify(item._id, "approved")}
                    style={{ marginRight: "10px" }}
                  >
                    Approve
                  </Button>
                  <Button
                    danger
                    onClick={() => handleVerify(item._id, "rejected")}
                  >
                    Reject
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default VerifierDashboard;
