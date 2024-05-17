import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ItemCard from "../components/FreameReco/ItemCard";
import axios from "axios";
import { Button } from "@mui/material";

export default function FrameRecommendation() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [rgbValues, setRgbValues] = useState([0, 0, 0]);
  const [colorName, setColorName] = useState(null);
  const [products, setProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  async function getAllFrames() {
    try {
      await axios
        .get("http://localhost:8080/api/v1/product/product-category/frames")
        .then(({ data }) => {
          console.log(data);
          setProducts(data.products);
        });
    } catch (error) {
      setProducts([]);
    }
  }

  useEffect(() => {
    getAllFrames();
  }, []);

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    setSelectedFile(event.target.files[0]);
    reader.onload = () => {
      const result = reader.result;
      setSelectedPhoto(result);
      setColorName(null);
      setRgbValues([0, 0, 0]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    axios
      .post("http://127.0.0.1:5000/get-color", formData)
      .then((response) => {
        setColorName(response.data.color_name);
        setRgbValues(response.data.rgb_values);
        const filteredObjects = products.filter((obj) =>
          response.data.frames.includes(obj._id)
        );
        setRecommendedProducts(filteredObjects);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const circleStyle = {
    width: "100px",
    height: "100px",
    backgroundColor: `rgb(${rgbValues.join(",")})`,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "1rem",

    textAlign: "center",
  };

  return (
    <Layout>
      <div
        style={{
          marginTop: "10vh",
          display: "flex",
          padding: "1rem",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: "#E9EAEC",
              width: "90%",
              height: "50vh",
              textAlign: "center",
              verticalAlign: "middle",
              lineHeight: "20vh",
              border: "1px solid #C7C9CE",
              cursor: "pointer",
              marginTop: "10vh",
            }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none", cursor: "pointer" }}
              onChange={handlePhotoUpload}
              id="photoInput"
            />
            {selectedPhoto ? (
              <label htmlFor="photoInput">
                <img
                  src={selectedPhoto}
                  alt="Uploaded"
                  style={{
                    minWidth: "100%",
                    maxWidth: "100%",
                    minHeight: "50vh",
                    maxHeight: "50vh",
                    cursor: "pointer",
                  }}
                />
              </label>
            ) : (
              <label
                htmlFor="photoInput"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <PhotoCameraIcon size={20} />
                <span style={{ marginLeft: "10px" }}>Add Photo</span>
              </label>
            )}
          </div>
          <Button
            style={{
              minWidth: "90%",
              maxWidth: "100%",
              backgroundColor: "black",
            }}
            variant="contained"
            onClick={() => handleUpload()}
          >
            Upload
          </Button>

          {colorName && rgbValues && (
            <div>
              <br />
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "2rem", fontSize: "24px" }}>
                  Selected Color
                </div>
                <div style={circleStyle}>{colorName}</div>
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            flex: 3,
            padding: "2rem",
            maxWidth: "55%",
          }}
        >
          <h3>Best Matching Frames</h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              overflowX: "auto",
              border: "1px solid #A5A9B1",
              borderRadius: "10px",
              whiteSpace: "nowrap",
              padding: "2rem",
              paddingBottom:'0rem',
              minHeight: '100%',
            }}
          >
            {recommendedProducts.length !== 0 ? (
              recommendedProducts.map((product) => <ItemCard item={product} />)
            ) : (
              <div
                style={{
                  marginLeft: "20%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2>Please upload a image of your wall.</h2>
                <h3>We will give matching frames</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
