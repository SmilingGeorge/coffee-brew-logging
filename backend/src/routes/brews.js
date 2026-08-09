const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();

// GET /api/brews
router.get("/", async (req, res) => {
  try {
    const { method } = req.query;

    const brews = await prisma.brew.findMany({
      where: method
        ? {
            brewMethod: method,
          }
        : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(brews);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch brews",
    });
  }
});

// POST /api/brews
router.post("/", async (req, res) => {
  try {
    const {
      coffeeName,
      brewMethod,
      coffeeAmount,
      waterAmount,
      brewTime,
      notes,
    } = req.body;

    if (
      !coffeeName ||
      !brewMethod ||
      coffeeAmount === undefined ||
      waterAmount === undefined ||
      brewTime === undefined ||
      !notes
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const brew = await prisma.brew.create({
      data: {
        coffeeName,
        brewMethod,
        coffeeAmount: Number(coffeeAmount),
        waterAmount: Number(waterAmount),
        brewTime: Number(brewTime),
        notes,
      },
    });

    res.status(201).json(brew);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create brew",
    });
  }
});

// PUT /api/brews/:id
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      coffeeName,
      brewMethod,
      coffeeAmount,
      waterAmount,
      brewTime,
      notes,
    } = req.body;

    if (
      !coffeeName ||
      !brewMethod ||
      coffeeAmount === undefined ||
      waterAmount === undefined ||
      brewTime === undefined ||
      !notes
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingBrew = await prisma.brew.findUnique({
      where: { id },
    });

    if (!existingBrew) {
      return res.status(404).json({
        message: "Brew not found",
      });
    }

    const brew = await prisma.brew.update({
      where: { id },
      data: {
        coffeeName,
        brewMethod,
        coffeeAmount: Number(coffeeAmount),
        waterAmount: Number(waterAmount),
        brewTime: Number(brewTime),
        notes,
      },
    });

    res.status(200).json(brew);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update brew",
    });
  }
});

// DELETE /api/brews/:id
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existingBrew = await prisma.brew.findUnique({
      where: { id },
    });

    if (!existingBrew) {
      return res.status(404).json({
        message: "Brew not found",
      });
    }

    await prisma.brew.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete brew",
    });
  }
});

module.exports = router;