import { useEffect,useState } from "react";

import Button from "../common/Button";
import Input from "../common/Input";
import { getMyProjects } from "../../services/projectService";


function ReportForm({ onSubmit, initialData = {}}) {


    const [formData, setFormData] = useState({

     projectId: initialData.projectId || "",

     weekStartDate: initialData.weekStartDate

        ? initialData.weekStartDate.slice(0,10)

        : "",

     weekEndDate: initialData.weekEndDate

        ? initialData.weekEndDate.slice(0,10)

        : "",

     tasksCompleted: initialData.tasksCompleted || "",

     tasksPlanned: initialData.tasksPlanned || "",

     blockers: initialData.blockers || "",

     hoursWorked: initialData.hoursWorked || "",

     notes: initialData.notes || ""

    });

    const [projects,setProjects] = useState([]);

    useEffect(()=>{

         const fetchProjects = async()=>{

          try{

               const data = await getMyProjects();

                setProjects(data);

            }
            catch(error){
               console.log(error);
            }

        };


        fetchProjects();


    },[]);



    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };



    const handleSubmit = (e)=>{

        e.preventDefault();

        onSubmit(formData);

    };



    return (

        <form 
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-xl shadow"
        >


            <div>

                <label>
                    Week Start Date
                </label>

                <Input
                    type="date"
                    name="weekStartDate"
                    value={formData.weekStartDate}
                    onChange={handleChange}
                />

            </div>



            <div>

                <label>
                    Week End Date
                </label>

                <Input
                    type="date"
                    name="weekEndDate"
                    value={formData.weekEndDate}
                    onChange={handleChange}
                />

            </div>



            <div>

                <label>
                    Project 
                </label>

            <Input

                as="select"
                name="projectId"
                value={formData.projectId}
                onChange={handleChange}
            >

                 <option value="">

                   Select Project

                </option>

            {

                projects.map((project)=>(

                <option

                    key={project.id}

                    value={project.id}

                >

                    {project.name}

                </option>

                ))

            }

            </Input>

            </div>



            <div>

                <label>
                    Tasks Completed
                </label>

                <Input
                    as="textarea"
                    name="tasksCompleted"
                    value={formData.tasksCompleted}
                    onChange={handleChange}
                />

            </div>



            <div>

                <label>
                    Tasks Planned For Next Week
                </label>

                <Input
                    as="textarea"
                    name="tasksPlanned"
                    value={formData.tasksPlanned}
                    onChange={handleChange}
                />

            </div>



            <div>

                <label>
                    Blockers / Challenges
                </label>

                <Input
                    as="textarea"
                    name="blockers"
                    value={formData.blockers}
                    onChange={handleChange}
                />

            </div>



            <div>

                <label>
                    Hours Worked
                </label>

                <Input
                    type="number"
                    name="hoursWorked"
                    value={formData.hoursWorked}
                    onChange={handleChange}
                />

            </div>



            <div>

                <label>
                    Notes / Links
                </label>

                <Input
                    as="textarea"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />

            </div>



            <Button type="submit" size="lg">
                Submit Report
            </Button>



        </form>

    );

}


export default ReportForm;