const express = require("express");
const { collection } = require("../database");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const brands = await collection
      .aggregate([
        { $group: { _id: "$brand", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .toArray();

    const categories = await collection
      .aggregate([
        {
          $project: {
            category: {
              $arrayElemAt: [
                {
                  $split: [{ $arrayElemAt: ["$product_categories", 0] }, " > "],
                },
                1,
              ],
            },
          },
        },
        {
          $group: { _id: "$category" },
        },
        { $sort: { _id: 1 } }, // Sorting alphabetically as count is not available
      ])
      .toArray();

    res.json({
      categories: categories,
      brands: brands,
    });
  } catch (error) {
    console.error("Error fetching filter information:", error);
    res.status(500).json({ error: "Failed get filter information" });
  }
});

module.exports = router;
