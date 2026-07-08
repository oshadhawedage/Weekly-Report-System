import { useEffect, useState } from "react";

import Button from "../common/Button";
import Input from "../common/Input";
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


            <Input

                as="select"

                name="userId"

                value={filters.userId}

                onChange={handleChange}

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


            </Input>



            <Input

                as="select"

                name="projectId"

                value={filters.projectId}

                onChange={handleChange}

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


            </Input>



            <Input

                type="date"

                name="startDate"

                value={filters.startDate}

                onChange={handleChange}

            />



            <Input

                type="date"

                name="endDate"

                value={filters.endDate}

                onChange={handleChange}

            />



            <Button type="submit">
                Filter
            </Button>

            <Button
              type="button"
              onClick={handleReset}
              variant="secondary"
            >
                Reset
            </Button>


        </form>

    );

}


export default ReportFilters;