import Crush from "../models/crush.model.js";

// CREATE
export const addCrush = async (req, res) => {
  try {
    const crush = await Crush.create(req.body);
    res.status(201).json(crush);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
export const getAllCrushes = async (req, res) => {
  try {
    const crushes = await Crush.find();
    res.status(200).json(crushes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
export const getCrushById = async (req, res) => {
  try {
    const crush = await Crush.findById(req.params.id);
    if (!crush) return res.status(404).json({ error: "Crush not found" });
    res.status(200).json(crush);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateCrush = async (req, res) => {
  try {
    const crush = await Crush.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!crush) return res.status(404).json({ error: "Crush not found" });
    res.status(200).json(crush);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteCrush = async (req, res) => {
  try {
    const crush = await Crush.findByIdAndDelete(req.params.id);
    if (!crush) return res.status(404).json({ error: "Crush not found" });
    res.status(200).json({ message: "Crush deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
