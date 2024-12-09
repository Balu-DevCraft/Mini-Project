import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";

function DetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true); // Set loading state to true before the fetch
      try {
        const response = await axios.get(`http://localhost:3000/getItem/${id}`);
        setItem(response.data); // Update the item state with the fetched data
        console.log(response);  // Log the response object to inspect its contents
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false); // Ensure loading is false after the fetch, regardless of success or error
      }
    };

    if (id) {
      fetchItem(); // Call the fetch function only if `id` exists
    }
  }, [id]); // Dependency array includes `id` to re-run the effect when `id` changes

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <p>Loading item details...</p>
      </div>
    );
  }

  if (!item) {
    return <p>Item not found</p>;
  }

  return (
    <div className="detail-container">
      <h1>{item.name}</h1>
      <img src={`http://localhost:3000${item.img}`} alt={item.name} />
      <p><strong>Certificate ID:</strong> {item.certificateId}</p>
      <p><strong>Year:</strong> {item.year}</p>
      <p><strong>Price:</strong> ₹{item.price}</p>
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Unique Code:</strong> {item.uniqueCode}</p>
    </div>
  );
}

export default DetailPage;
