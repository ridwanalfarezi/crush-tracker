import { getCrushes } from "../actions/crushActions";
import useQuery from "../hooks/useQuery";
import EmptyState from "./EmptyState";

export default function CrushList({ onEdit, onDelete }) {
  const crushes = useQuery({
    fn: () => getCrushes(),
    key: "crushes",
  });

  if (crushes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="table-container">
      <h2>Daftar Crush</h2>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Status</th>
            <th>Catatan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {crushes.map((crush) => (
            <tr key={crush._id}>
              <td>{crush.name}</td>
              <td>
                <span className={`status status-${crush.status}`}>
                  {crush.status === "gebetan"
                    ? "Gebetan"
                    : crush.status === "temen"
                    ? "Teman"
                    : "Mantan"}
                </span>
              </td>
              <td>{crush.note}</td>
              <td>
                <div className="table-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => onEdit(crush)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(crush._id)}
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
