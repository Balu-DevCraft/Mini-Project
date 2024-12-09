import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Spin, Modal } from "antd";
import "./VerifierDashboard.css";

const { Meta } = Card;

const VerifierDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch pending items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getPendingItems");
        setItems(response.data);
        console.log("res", response);
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
        setItems((prevItems) => prevItems.filter((item) => item._id !== itemId)); // Remove approved item from the list
        alert("Item approved successfully.");
      } else if (status === "rejected") {
        await axios.delete(`http://localhost:3000/rejectItem/${itemId}`);
        setItems((prevItems) => prevItems.filter((item) => item._id !== itemId)); // Remove rejected item from the list
        alert("Item rejected and deleted successfully.");
      }
    } catch (error) {
      console.error(`Error updating item status (${status}):`, error);
      alert(`Failed to ${status} item.`);
    }
  };

  // Handle card click to show modal
  const handleCardClick = (item) => {
    setSelectedItem(item);
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
    setSelectedItem(null);
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
                cover={
                  <img
                    alt={item.name}
                    src={`http://localhost:3000${item.img}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "default-image.jpg"; // Fallback to default image if the image fails to load
                    }}
                    onLoad={() => {
                      console.log("Image loaded successfully.");
                    }}
                  />
                }
                onClick={() => handleCardClick(item)}
              >
                <Meta title={item.name} description={item.description} />
                <p>
                  <strong>Unique Code:</strong> {item.uniqueCode}
                </p>
                <div className="card-actions">
                  <Button
                    type="primary"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click event
                      handleVerify(item._id, "approved");
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    Approve
                  </Button>
                  <Button
                    danger
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click event
                      handleVerify(item._id, "rejected");
                    }}
                  >
                    Reject
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {selectedItem && (
        <Modal
          visible={visible}
          title={selectedItem.name}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>,
          ]}
        >
          <img
            alt={selectedItem.name}
            src={`http://localhost:3000${selectedItem.img}`}
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <p>
            <strong>Certificate ID:</strong> {selectedItem.certificateId}
          </p>
          <p>
            <strong>Year:</strong> {selectedItem.year}
          </p>
          <p>
            <strong>Description:</strong> {selectedItem.description}
          </p>
          <p>
            <strong>Price:</strong> ${selectedItem.price}
          </p>
          <p>
            <strong>Unique Code:</strong> {selectedItem.uniqueCode}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default VerifierDashboard;
