const express = require("express");
const { collection } = require("../database");
const router = express.Router();

// Helper function to extract filter state from request body
function extractFilterState(req) {
  const { filterState } = req.body;

  return {
    brand: filterState.brand || [],
    gender: filterState.gender || [],
    priceRange: filterState.priceRange || [0, 500],
    category: filterState.category || [],
    keyword: filterState.keyword || "",
  };
}

// Helper function to build query filters
function buildQuery(filterState) {
  const query = {};

  if (filterState.brand.length > 0) {
    query.brand = { $in: filterState.brand };
  }

  if (filterState.category.length > 0) {
    query.product_categories = {
      $in: filterState.category.map((cat) => new RegExp(cat, "i")),
    };
  }

  if (filterState.gender.length > 0) {
    query.gender = { $in: filterState.gender };
  }

  if (filterState.priceRange.length === 2) {
    const [minPrice, maxPrice] = filterState.priceRange;

    query.$expr = {
      $and: [
        {
          $gte: [
            {
              $subtract: ["$price", { $multiply: ["$price", "$discount"] }],
            },
            parseInt(minPrice),
          ],
        },
        maxPrice
          ? {
              $lte: [
                {
                  $subtract: ["$price", { $multiply: ["$price", "$discount"] }],
                },
                parseInt(maxPrice),
              ],
            }
          : {},
      ],
    };
  }

  if (filterState.keyword) {
    query.product_title = { $regex: new RegExp(filterState.keyword, "i") };
  }

  return query;
}

// Helper function to handle pagination
function getPagination(req) {
  const { activePage = 1, pageSize = 20 } = req.body;
  const skip = (activePage - 1) * pageSize;
  return { activePage, pageSize, skip };
}

router.post("/filter", async (req, res) => {
  try {
    const filterState = extractFilterState(req);
    const query = buildQuery(filterState);
    const { activePage, pageSize, skip } = getPagination(req);

    const products = await collection
      .find(query)
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await collection.countDocuments(query);

    res.json({
      activePage,
      pageSize,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      products,
    });
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).json({ error: "Failed to fetch filtered products" });
  }
});

router.post("/product", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const product = await collection.findOne({
      product_id: id,
    });

    // If product is not found, send a 404 response
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

router.post("/category", async (req, res) => {
  try {
    const { category, id } = req.body;
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const similiarProducts = await collection
      .find({
        product_categories: category,
        product_id: { $ne: id },
      })
      .limit(10)
      .toArray();

    // If product is not found, send a 404 response
    if (!similiarProducts) {
      return res.status(404).json({ message: "No similar products found!" });
    }

    res.json(similiarProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

module.exports = router;
