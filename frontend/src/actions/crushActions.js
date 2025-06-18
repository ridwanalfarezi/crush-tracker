"use server";

let crushes = [
  {
    _id: "1",
    name: "John Doe",
    status: "temen",
    note: "Met at college",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Jane Smith",
    status: "gebetan",
    note: "Works at coffee shop",
    createdAt: new Date().toISOString(),
  },
];

export const getCrushes = () => {
  return Promise.resolve(crushes);
};

export async function saveCrush(prevState, formData) {
  const id = formData.get("_id");
  const data = {
    name: formData.get("name"),
    status: formData.get("status"),
    note: formData.get("note"),
  };

  try {
    if (id) {
      // Update
      crushes = crushes.map((crush) =>
        crush._id === id ? { ...crush, ...data } : crush
      );
      return {
        success: true,
        data: crushes.find((c) => c._id === id),
        error: null,
      };
    } else {
      // Create
      const newCrush = {
        _id: String(Date.now()),
        ...data,
        createdAt: new Date().toISOString(),
      };
      crushes.push(newCrush);
      return { success: true, data: newCrush, error: null };
    }
  } catch (e) {
    return { success: false, data: null, error: e.message };
  }
}

export async function deleteCrush(id) {
  try {
    crushes = crushes.filter((crush) => crush._id !== id);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}
