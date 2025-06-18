"use server";

import fetcher from "../lib/api";

const API_URL = import.meta.env.VITE_API_URL;

export const getCrushes = () => fetcher(API_URL);

export async function saveCrush(prevState, formData) {
  const id = formData.get("_id");
  const data = {
    name: formData.get("name"),
    status: formData.get("status"),
    note: formData.get("note"),
  };

  const url = id ? `${API_URL}/${id}` : API_URL;
  const method = id ? "PUT" : "POST";

  try {
    const result = await fetcher(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return { success: true, data: result, error: null };
  } catch (e) {
    return { success: false, data: null, error: e.message };
  }
}

export async function deleteCrush(id) {
  if (!id) return { success: false, error: "ID is required" };
  try {
    await fetcher(`${API_URL}/${id}`, { method: "DELETE" });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}
