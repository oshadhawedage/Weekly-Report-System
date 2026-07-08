import { useEffect, useState } from "react";

import { getProjects } from "../../services/projectService";
import { getMembers } from "../../services/projectService";


function ReportFilters({ onFilter }) {


    const [projects,setProjects] = useState([]);
    const [members,setMembers] = useState([]);


    const [filters,setFilters] = useState({

        userId:"",
        projectId:"",
        startDate:"",
        endDate:""

    });



    useEffect(()=>{


        const loadData = async()=>{

            try{

                const projectData = await getProjects();

                const memberData = await getMembers();


                setProjects(projectData);

                setMembers(memberData);


            }
            catch(error){

                console.log(error);

            }

        };


        loadData();


    },[]);




    const handleChange=(e)=>{


        setFilters({

            ...filters,

            [e.target.name]:e.target.value

        });


    };




    const handleSubmit=(e)=>{

        e.preventDefault();

        onFilter(filters);

    };

    const handleReset = ()=>{

    const emptyFilters = {

        userId:"",
        projectId:"",
        startDate:"",
        endDate:""

    };

    setFilters(emptyFilters);

    onFilter(emptyFilters);

  };



    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white p-5 rounded-xl shadow grid md:grid-cols-4 gap-4"
        >


            <select

                name="userId"

                value={filters.userId}

                onChange={handleChange}

                className="border p-2 rounded"

            >

                <option value="">
                    All Members
                </option>


                {
                    members.map(member=>(

                        <option
                            key={member.id}
                            value={member.id}
                        >

                            {member.name}

                        </option>

                    ))
                }


            </select>




            <select

                name="projectId"

                value={filters.projectId}

                onChange={handleChange}

                className="border p-2 rounded"

            >

                <option value="">
                    All Projects
                </option>


                {
                    projects.map(project=>(

                        <option
                            key={project.id}
                            value={project.id}
                        >

                            {project.name}

                        </option>

                    ))
                }


            </select>




            <input

                type="date"

                name="startDate"

                value={filters.startDate}

                onChange={handleChange}

                className="border p-2 rounded"

            />



            <input

                type="date"

                name="endDate"

                value={filters.endDate}

                onChange={handleChange}

                className="border p-2 rounded"

            />



            <button

                className="bg-blue-600 text-white rounded px-4 py-2"

            >

                Filter

            </button>

            <button

              type="button"

              onClick={handleReset}

              className="bg-gray-500 text-white rounded px-4 py-2"

            >

                Reset

            </button>


        </form>

    );

}


export default ReportFilters;