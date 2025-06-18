import { Suspense, useState } from "react";
import Swal from "sweetalert2";
import { deleteCrush as deleteCrushAction } from "../actions/crushActions";
import CrushForm from "../components/CrushForm";
import CrushList from "../components/CrushList";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { promiseCache } from "../hooks/useQuery";

function CrushSection() {
  const [editingCrush, setEditingCrush] = useState(null);
  const [key, setKey] = useState(0);

  const refreshList = () => {
    promiseCache.delete("crushes");
    setKey((prevKey) => prevKey + 1);
    setEditingCrush(null);
  };

  function handleSave() {
    refreshList();
  }

  async function handleDelete(id) {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await deleteCrushAction(id);
        refreshList();
        Swal.fire("Terhapus!", "Data crush berhasil dihapus.", "success");
      } catch (error) {
        Swal.fire(error.message);
      }
    }
  }

  return (
    <div className="grid">
      <div>
        <div className="card">
          <h2>
            {editingCrush ? `Edit ${editingCrush.name}` : "Add New Crush"}
          </h2>
          <CrushForm
            key={editingCrush?._id || "new"}
            initialData={editingCrush || {}}
            onSave={handleSave}
            onCancel={() => setEditingCrush(null)}
          />
        </div>
      </div>
      <div>
        <Suspense key={key} fallback={<LoadingSkeleton />}>
          <CrushList onEdit={setEditingCrush} onDelete={handleDelete} />
        </Suspense>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="container">
      <div className="header">
        <h1>Crush Tracker</h1>
        <p>Keep track of your crushes, friends, and exes</p>
      </div>
      <CrushSection />
    </div>
  );
}
