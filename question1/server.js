const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3001;

const clientID = "2a15ff6a-d553-496b-ad48-a407085fc8cd";
const clientSecret = "WojGGIwPQfwkFayq";
const testServerBaseURL = "http://20.244.56.144/test";

app.use(cors());

let accessToken = "";

// Function to authenticate and get access token
const authenticate = async () => {
  try {
    const response = await axios.post(`${testServerBaseURL}/auth`, {
      companyName: "Vaibhav",
      clientID: clientID,
      clientSecret: clientSecret,
      ownerName: "Vaibhav",
      ownerEmail: "vaiibhav75@gmail.com",
      rollNo: "05920802721",
    });
    accessToken = response.data.access_token;
    console.log("Authenticated successfully, access token acquired.");
  } catch (error) {
    console.error("Error authenticating:", error.message);
  }
};

// Middleware to ensure the access token is available
app.use(async (req, res, next) => {
  if (!accessToken) {
    await authenticate();
  }
  next();
});

// Route to fetch products by category
app.get("/categories/:categoryName/products", async (req, res) => {
  const { categoryName } = req.params;
  const {
    n = 10,
    minPrice = 1,
    maxPrice = 10000,
    sort = "",
    order = "asc",
    page = 1,
  } = req.query;
  const companyNames = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

  try {
    let allProducts = [];

    for (const company of companyNames) {
      const response = await axios.get(
        `${testServerBaseURL}/companies/${company}/categories/${categoryName}/products`,
        {
          params: { top: n, minPrice: minPrice, maxPrice },
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      allProducts = allProducts.concat(response.data);
    }

    if (sort) {
      allProducts.sort((a, b) => {
        const comparison = order === "asc" ? 1 : -1;
        return a[sort] > b[sort] ? comparison : -comparison;
      });
    }

    const start = (page - 1) * n;
    const paginatedProducts = allProducts.slice(start, start + n);

    res.json(paginatedProducts);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
