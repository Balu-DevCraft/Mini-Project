import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Button } from "antd";
import axios from "axios";
import img1 from "../Assets/img1.jpg";
import img2 from "../Assets/img2.jpg";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import "./Mainpage.css"; 

const { Meta } = Card;

function Mainpage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Fetch items from the API
  useEffect(() => {
    axios
      .get("http://localhost:3000/getApprovedItems")
      .then((response) => {
        setItems(response.data);
        console.log(response);
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  }, []);
// Handle card click to navigate to detail page 
const handleCardClick = (id) => { navigate(`/details/${id}`); };
  return (
    <div style={{ backgroundColor: "#f9f9f9", paddingBottom: "50px" }}>
      {/* Header Button */}
      <div className="header-actions text-right" style={{ padding: "20px" }}>
        <Link to="/add">
          <button
            type="button"
            className="btn btn-secondary"
            style={{ fontSize: "16px", padding: "10px 20px" }}
          >
            Sell Antique
          </button>
        </Link>
      </div>

      {/* Story Section */}
      <div className="texts text-center container py-5">
        <h2 className="font-weight-bold">THE GREATEST STORIES SHOULD LIVE FOREVER</h2>
        <p style={{ marginTop: "20px", fontSize: "16px", lineHeight: "1.8" }}>
          Antique Story is, simply, all about the story. We take great pride in culling out the most
          profound narratives from the past and retelling them through the lens of vintage artifacts,
          home décor, and handpicked collectibles. Join us in giving these stories a new life.
        </p>
      </div>

      {/* History Section */}
      <Container>
        <Row>
          <Col md={12} className="d-flex align-items-center">
            <img src={img1} alt="Antique Story" style={{ width: "100%", borderRadius: "10px" }} />
          </Col>
          <Col md={12} className="text-center d-flex align-items-center">
            <div>
              <h3>OUR HISTORY DESERVES A FUTURE</h3>
              <p style={{ marginTop: "20px", fontSize: "16px", lineHeight: "1.8" }}>
                All our work at Antique Story is a natural extension of this spirit. As heirs to the
                glorious legacy of India that spans millennia, it is our pleasure and privilege to
                conserve the treasures of this time, and pass them on to future generations.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Art Section */}
      <Container className="mt-5">
        <Row>
          <Col md={12} className="text-center d-flex align-items-center">
            <div>
              <h3>THE ONE THING ART MUST HAVE IS HEART</h3>
              <p style={{ marginTop: "20px", fontSize: "16px", lineHeight: "1.8" }}>
                At Antique Story, we put great thought and passion into what we pick and why we pick
                it. From rare folk art to exquisitely carved wooden panels, every object carries
                deep inspiration, meaning, and joy.
              </p>
            </div>
          </Col>
          <Col md={12} className="d-flex align-items-center">
            <img src={img2} alt="Antique Art" style={{ width: "100%", borderRadius: "10px" }} />
          </Col>
        </Row>
      </Container>

      {/* Antique Collection Section */}
      <div className="antique-collection text-center py-5">
        <h1 className="mb-4">Antique Collection</h1>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Row gutter={[16, 16]} justify="center">
            {items && items.length > 0 ? (
              items.map((item) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.certificateId}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={item.name}
                        src={`http://localhost:3000${item.img}`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "default-image.jpg"; // Fallback to default image if the image fails to load
                        }}
                        style={{ height: "200px", objectFit: "cover", borderRadius: "10px 10px 0 0" }}
                      />
                    }
                    style={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    onClick={() => handleCardClick(item._id)}
                  >
                    <Meta title={item.name} description={`Certificate ID: ${item.certificateId}`} />
                    <p>
                      <strong>Year:</strong> {item.year}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{item.price}
                    </p>
                    <p>
                      <strong>Description:</strong> {item.description}
                    </p>
                    <Button type="primary" style={{ marginTop: "10px" }}>
                      Buy Now
                    </Button>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No items found</p>
            )}
          </Row>
        )}
      </div>
    </div>
  );
}

export default Mainpage;
