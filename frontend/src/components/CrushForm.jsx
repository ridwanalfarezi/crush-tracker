import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import Swal from "sweetalert2";
import { saveCrush } from "../actions/crushActions";

function SubmitButton({ isEditing }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary"
      style={{ width: "100%" }}
      disabled={pending}
    >
      {pending ? "Menyimpan..." : isEditing ? "Update Crush" : "Add Crush"}
    </button>
  );
}

function FormContent({ initialData, onSave, onCancel, formState, formRef }) {
  const { pending } = useFormStatus();
  const wasPending = useRef(pending);

  useEffect(() => {
    if (wasPending.current && !pending) {
      if (formState.success) {
        formRef.current?.reset();
        onSave(formState.data);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Data berhasil disimpan!",
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (formState.error) {
        Swal.fire("Gagal!", formState.error, "error");
      }
    }
    wasPending.current = pending;
  }, [pending, formState, onSave, formRef]);

  useEffect(() => {
    if (initialData?._id && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [initialData, formRef]);

  const isEditing = !!initialData._id;

  return (
    <div>
      {isEditing && <input type="hidden" name="_id" value={initialData._id} />}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={initialData.name}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          defaultValue={initialData.status || "temen"}
          required
          className="form-control"
        >
          <option value="temen">Temen</option>
          <option value="gebetan">Gebetan</option>
          <option value="mantan">Mantan</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="note">Note</label>
        <textarea
          id="note"
          name="note"
          defaultValue={initialData.note}
          rows={3}
          className="form-control"
        />
      </div>
      <div className="form-actions">
        <SubmitButton isEditing={isEditing} />
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="btn"
            style={{ width: "100%", marginTop: "0.75rem" }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default function CrushForm(props) {
  const [state, formAction] = useActionState(saveCrush, {
    success: false,
    error: null,
  });
  const formRef = useRef(null);

  return (
    <form ref={formRef} action={formAction} key={props.initialData?._id}>
      <FormContent {...props} formState={state} formRef={formRef} />
    </form>
  );
}
