import { useEffect,useState } from "react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import ProjectCard from "../../components/projects/ProjectCard";
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
                    projects.map((project)=> (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onEdit={() => setSelectedProject(project)}
                            onAssign={handleAssignClick}
                            onDelete={handleDelete}
                        />
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

                    <Input
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

            <Button

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

            </Button>

        </div>

    </div>
)}


        </div>

    );

}


export default Projects;