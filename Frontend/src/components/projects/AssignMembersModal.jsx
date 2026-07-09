import Button from "../common/Button";
import Input from "../common/Input";


function AssignMembersModal({
    project,
    members,
    selectedUsers,
    setSelectedUsers,
    onSave,
    onClose
}) {


    if (!project) return null;


    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="bg-white rounded-[1.5rem] shadow-2xl w-full max-w-xl overflow-hidden">

                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h2 className="text-2xl font-bold">Assign Members</h2>
                        <p className="mt-1 text-sm text-slate-600">
                            Select team members to assign to this project.
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-slate-600 hover:text-slate-900"
                        onClick={onClose}
                    >
                        ✕
                    </Button>

                </div>

                <div className="border-t border-slate-200 px-6 py-4 sm:px-8">
                    <p className="text-sm text-slate-600">
                        Project:
                        <span className="font-semibold text-slate-900 ml-1">
                            {project.name}
                        </span>
                    </p>
                </div>

                <div className="max-h-[28rem] overflow-y-auto px-6 py-4 sm:px-8">
                    <div className="grid gap-3">
                        {members.length === 0 ? (
                            <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                                No available members to assign.
                            </p>
                        ) : (
                            members.map((member) => (
                                <label
                                    key={member.id}
                                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-slate-300"
                                >
                                    <Input
                                        type="checkbox"
                                        checked={selectedUsers.includes(member.id)}
                                        onChange={() => {
                                            setSelectedUsers((prev) =>
                                                prev.includes(member.id)
                                                    ? prev.filter((id) => id !== member.id)
                                                    : [...prev, member.id]
                                            );
                                        }}
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600"
                                    />

                                    <span className="text-sm text-slate-900">
                                        {member.name}
                                        <span className="text-slate-500"> ({member.email})</span>
                                    </span>
                                </label>
                            ))
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
                    <Button onClick={onClose} variant="secondary" size="md" className="w-full sm:w-auto">
                        Cancel
                    </Button>
                    <Button onClick={onSave} size="md" className="w-full sm:w-auto">
                        Save Members
                    </Button>
                </div>
            </div>

        </div>

    );

}


export default AssignMembersModal;