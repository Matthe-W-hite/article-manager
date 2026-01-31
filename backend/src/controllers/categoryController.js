import Category from "../models/Category.js";

// CREATE
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Taka kategoria już istnieje" });
    }

    const category = await Category.create({ name });

    res.status(201).json({
      message: "Kategoria utworzona",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera", error });
  }
};

// GET ALL
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera", error });
  }
};

// DELETE
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Kategoria nie istnieje" });
    }

    await category.deleteOne();

    res.json({ message: "Kategoria usunięta" });
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera", error });
  }
};

//UPDATE
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Kategoria nie istnieje" });
    }

    category.name = name ?? category.name;

    await category.save();

    res.json({
      message: "Kategoria zaktualizowana",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera", error });
  }
};
