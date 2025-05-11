import React from "react";
import { Link } from "react-router-dom";

function LawnCareNews() {
  return (
      <div style={styles.pageContainer}>
          <header style={styles.header}>
              <h1 style={styles.title}>📰 LawnCare News</h1>
              <Link to="/" style={styles.backButton}>⬅️ Back to Assistant</Link>
          </header>

          <div style="position: relative; width: 100%; padding-top: 177.78%; /* Aspect ratio: 1600/900 * 100 */">
              <iframe
                  src="https://rss.app/embed/v1/imageboard/t1a1R57YDSb58uQy"
                  frameBorder="0"
                  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;">
              </iframe>
          </div>
      </div>
  );
}

const styles = {
    pageContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
    },
    header: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    color: "#2b2b2b",
  },
  backButton: {
    textDecoration: "none",
    backgroundColor: "#3E7E3C",
    color: "#FFFFFF",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    fontSize: "0.9rem",
  },
  newsContainer: {
    width: "100%",
    maxWidth: "900px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  iframe: {
    width: "100%",
    height: "80vh",
    border: "none",
  },
};

export default LawnCareNews;
