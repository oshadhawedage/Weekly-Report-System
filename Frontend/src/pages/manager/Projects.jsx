import { useEffect,useState } from "react";

import ProjectForm from "../../components/projects/ProjectForm";

import {
    getProjects,
    createProject,
    deleteProject,
    updateProject,
    getMembers,
    assignUsersToProject
} from "../../services/projectService";


function Projects(){


    const [projects,setProjects] = useState([]);
    const [selectedProject,setSelectedProject] = useState(null);

    const [members, setMembers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [assignProject, setAssignProject] = useState(null);



    const handleUpdate = async(data)=>{

        await updateProject(
            selectedProject.id,
            data
        );

       setSelectedProject(null);

       loadProjects();

    };



    const loadProjects = async()=>{

        const data = await getProjects();

        setProjects(data);

    };



    useEffect(()=>{

        loadProjects();

    },[]);



    const handleCreate = async(data)=>{

        await createProject(data);

        loadProjects();

    };



    const handleDelete = async(id)=>{

        await deleteProject(id);

        loadProjects();

    };

    const handleAssignClick = async (project) => {

       setAssignProject(project);

       const data = await getMembers();

       setMembers(data);

       setSelectedUsers([]);

    };



    return (

        <div className="space-y-6">


            <h1 className="text-3xl font-bold">
                Projects
            </h1>



            <ProjectForm

                onSubmit={

                    selectedProject
                    ? handleUpdate
                    : handleCreate
                }

                initialData={selectedProject}
            />



            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">


                {
                    projects.map((project)=>(


                        <div
                            key={project.id}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                        >
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

                            <div className="mt-6 flex flex-wrap gap-2">
                                <button
                                    onClick={()=>setSelectedProject(project)}
                                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleAssignClick(project)}
                                    className="rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-600 hover:to-teal-600"
                                >
                                    Assign Members
                                </button>

                                <button
                                    onClick={()=>handleDelete(project.id)}
                                    className="rounded-lg bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>


                    ))
                }


            </div>

            {assignProject && (

            <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-2xl font-bold mb-5">

                     Assign Members - {assignProject.name}

                </h2>

            <div className="space-y-3">

            {members.map((member) => (

                <label
                    key={member.id}
                    className="flex items-center gap-3"
                >

                    <input
                       type="checkbox"
                       checked={selectedUsers.includes(member.id)}
                       onChange={() => {

                            setSelectedUsers((prev) =>

                             prev.includes(member.id)

                             ? prev.filter((id)=> id !== member.id)

                             : [...prev, member.id]

                            );

                         }}
                    />

                    <span>

                        {member.name} ({member.email})

                    </span>

                </label>

            ))}

            <button

                onClick={async()=>{

                       await assignUsersToProject(
                       assignProject.id,
                       selectedUsers
                    );

                    setAssignProject(null);

                }}

                 className="mt-6 bg-blue-600 text-white px-5 py-2 rounded"

            >

               Save Members

            </button>

        </div>

    </div>
)}


        </div>

    );

}


export default Projects;