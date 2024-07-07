const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

const testServerBaseURL = "http://20.244.56.144/test";
const companyNames = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

const details = {
  companyName: "Vaibhav",
  clientID: "2a15ff6a-d553-496b-ad48-a407085fc8cd",
  clientSecret: "WojGGIwPQfwkFayq",
  ownerName: "Vaibhav",
  ownerEmail: "vaiibhav75@gmail.com",
  rollNo: "05920802721",
}


app.use(cors());
let accessToken = "";

// Middleware to ensure the access token is available
app.use(async (req, res, next) => {
  if (!accessToken) {
    try {
      const response = await axios.post(`${testServerBaseURL}/auth`, details);
      accessToken = response.data.access_token;
      console.log("Authenticated successfully, access token acquired.");
    } catch (error) {
      console.error("Error authenticating:", error.message);
    }
  }
  next();
});

// Route to fetch products by category
app.get("/categories/:category/products", async (req, res) => {

  const categoryName = req.params.category;
  const n = req.query.n;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const sort = req.query.sort;
  const order = req.query.order;
  const page = req.query.page;

  try {
    let allProducts = [];

    for (const company of companyNames) {
      const response = await axios.get(
        `${testServerBaseURL}/companies/${company}/categories/${categoryName}/products`,
        {
          params: { top: n, minPrice, maxPrice },
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

    const start = (page - 1) * 10;
    const paginatedProducts = allProducts.slice(start, start + 10);

    res.json(paginatedProducts);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});


app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
