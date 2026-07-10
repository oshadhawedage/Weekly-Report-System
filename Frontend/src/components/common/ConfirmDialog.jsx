import React from "react";
import Button from "./Button";

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmLabel = "Delete", cancelLabel = "Cancel" }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel} className="shrink-0">
            {cancelLabel}
          </Button>

          <Button variant="danger" onClick={onConfirm} className="shrink-0">
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
