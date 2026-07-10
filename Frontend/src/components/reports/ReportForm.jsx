import { useEffect,useState } from "react";

import Button from "../common/Button";
import Input from "../common/Input";
import { getMyProjects } from "../../services/projectService";


function ReportForm({ onSubmit, initialData = null}) {

    const [formData, setFormData] = useState({

     projectId: initialData?.projectId || "",

     weekStartDate: initialData?.weekStartDate

        ? initialData.weekStartDate.slice(0,10)

        : "",

     weekEndDate: initialData?.weekEndDate

        ? initialData.weekEndDate.slice(0,10)

        : "",

     tasksCompleted: initialData?.tasksCompleted || "",

     tasksPlanned: initialData?.tasksPlanned || "",

     blockers: initialData?.blockers || "",

     hoursWorked: initialData?.hoursWorked || "",

     notes: initialData?.notes || ""

    });

    const [projects,setProjects] = useState([]);
    const [fieldErrors,setFieldErrors] = useState({
        weekStartDate: "",
        weekEndDate: "",
        projectId: "",
        tasksCompleted: "",
        tasksPlanned: "",
        hoursWorked: ""
    });

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

        setFormData((prev) => ({

            ...prev,

            [e.target.name]: e.target.value

        }));

        setFieldErrors((prev) => ({
            ...prev,
            [e.target.name]: ""
        }));

    };



    const handleSubmit = (e)=>{

        e.preventDefault();

        const errors = {};

        if (!formData.weekStartDate) {
            errors.weekStartDate = "Start date is required";
        }

        if (!formData.weekEndDate) {
            errors.weekEndDate = "End date is required";
        }

        if (formData.weekStartDate && formData.weekEndDate) {
            const start = new Date(formData.weekStartDate);
            const end = new Date(formData.weekEndDate);
            if (end < start) {
                errors.weekEndDate = "End date cannot come before start date";
            }
        }

        if (!formData.projectId) {
            errors.projectId = "Project selection is required";
        }

        if (!formData.tasksCompleted.trim()) {
            errors.tasksCompleted = "Describe completed tasks";
        }

        if (!formData.tasksPlanned.trim()) {
            errors.tasksPlanned = "Describe planned tasks";
        }

        if (formData.hoursWorked === "" || formData.hoursWorked === null) {
            errors.hoursWorked = "Hours worked is required";
        } else if (Number.isNaN(Number(formData.hoursWorked))) {
            errors.hoursWorked = "Hours worked must be a number";
        } else if (Number(formData.hoursWorked) < 0) {
            errors.hoursWorked = "Hours worked cannot be negative";
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        const submissionData = {
            ...formData,
            projectId: formData.projectId.trim(),
            weekStartDate: formData.weekStartDate.trim(),
            weekEndDate: formData.weekEndDate.trim(),
            tasksCompleted: formData.tasksCompleted.trim(),
            tasksPlanned: formData.tasksPlanned.trim(),
            blockers: formData.blockers.trim(),
            notes: formData.notes.trim(),
            hoursWorked: Number(formData.hoursWorked)
        };

        onSubmit(submissionData);
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
                    aria-invalid={Boolean(fieldErrors.weekStartDate)}
                    required
                />
                {fieldErrors.weekStartDate && (
                    <p className="text-sm text-red-500 mt-1">
                        {fieldErrors.weekStartDate}
                    </p>
                )}

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
                    aria-invalid={Boolean(fieldErrors.weekEndDate)}
                    required
                />
                {fieldErrors.weekEndDate && (
                    <p className="text-sm text-red-500 mt-1">
                        {fieldErrors.weekEndDate}
                    </p>
                )}

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
                aria-invalid={Boolean(fieldErrors.projectId)}
                required
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
            {fieldErrors.projectId && (
                <p className="text-sm text-red-500 mt-1">
                    {fieldErrors.projectId}
                </p>
            )}
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
                    aria-invalid={Boolean(fieldErrors.tasksCompleted)}
                />
                {fieldErrors.tasksCompleted && (
                    <p className="text-sm text-red-500 mt-1">
                        {fieldErrors.tasksCompleted}
                    </p>
                )}

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
                    aria-invalid={Boolean(fieldErrors.tasksPlanned)}
                />
                {fieldErrors.tasksPlanned && (
                    <p className="text-sm text-red-500 mt-1">
                        {fieldErrors.tasksPlanned}
                    </p>
                )}

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
                    aria-invalid={Boolean(fieldErrors.hoursWorked)}
                    min="0"
                    required
                />
                {fieldErrors.hoursWorked && (
                    <p className="text-sm text-red-500 mt-1">
                        {fieldErrors.hoursWorked}
                    </p>
                )}

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
              {
                initialData
                ? "Update Report"
                : "Create Report"
              }
           </Button>

        </form>

    );

}


export default ReportForm;