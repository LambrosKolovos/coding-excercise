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

    const discounts = await collection
      .aggregate([
        {
          $group: {
            _id: { $round: ["$discount", 1] },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },
      ])
      .toArray();
    res.json({
      categories: categories,
      brands: brands,
      discounts: discounts,
    });
  } catch (error) {
    console.error("Error grouping by brand:", error);
    res.status(500).json({ error: "Failed to group by brand" });
  }
});

module.exports = router;
