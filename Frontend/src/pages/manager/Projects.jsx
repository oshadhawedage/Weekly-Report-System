import { useEffect,useState } from "react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import ProjectCard from "../../components/projects/ProjectCard";
import ProjectForm from "../../components/projects/ProjectForm";
import AssignMembersModal from "../../components/projects/AssignMembersModal";

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

       const assignedIds = project.users.map(

        item => item.userId

        );

      setSelectedUsers(assignedIds);

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

            <AssignMembersModal

                project={assignProject}

                members={members}

                selectedUsers={selectedUsers}

                setSelectedUsers={setSelectedUsers}

                onClose={()=>setAssignProject(null)}

                onSave={async()=>{

                    await assignUsersToProject(
                    assignProject.id,
                    selectedUsers
                );

                setAssignProject(null);

              }}

            />

        </div>

    );

}


export default Projects;