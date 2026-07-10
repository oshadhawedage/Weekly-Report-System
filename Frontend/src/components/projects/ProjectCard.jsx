import React, { useState } from "react";
import Button from "../common/Button";
import ConfirmDialog from "../common/ConfirmDialog";

function ProjectCard({ project, onEdit, onAssign, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => setShowConfirm(true);
  const handleConfirm = () => {
    onDelete(project.id);
    setShowConfirm(false);
  };

  const handleCancel = () => setShowConfirm(false);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Project
          </span>
          <h2 className="mt-3 text-xl font-semibold text-slate-800">
            {project.name}
          </h2>
        </div>

        <div className="rounded-full bg-indigo-50 p-2 text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 16.5v-9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l8 5 8-5" />
          </svg>
        </div>
      </div>

      <p className="mt-4 min-h-[3.5rem] text-sm leading-6 text-slate-600">
        {project.description || "No description provided yet."}
      </p>

      <div className="mt-6 flex flex-nowrap items-stretch gap-2 overflow-x-auto">
        <Button onClick={() => onEdit(project)} variant="secondary" className="shrink-0">
          Edit
        </Button>

        <Button onClick={() => onAssign(project)} variant="success" className="shrink-0 whitespace-nowrap">
          Assign Members
        </Button>

        <Button onClick={handleDeleteClick} variant="danger" className="shrink-0">
          Delete
        </Button>
      </div>
      
      <ConfirmDialog
        open={showConfirm}
        title={`Delete project "${project.name}"`}
        message="This action cannot be undone. Are you sure you want to delete this project and all related data?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default ProjectCard;
