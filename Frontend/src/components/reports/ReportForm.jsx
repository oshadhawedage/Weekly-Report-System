import { useState } from "react";


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

                <input
                    type="date"
                    name="weekStartDate"
                    value={formData.weekStartDate}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />

            </div>



            <div>

                <label>
                    Week End Date
                </label>

                <input
                    type="date"
                    name="weekEndDate"
                    value={formData.weekEndDate}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />

            </div>



            <div>

                <label>
                    Project ID
                </label>

                <input
                    type="text"
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleChange}
                    placeholder="Select project later"
                    className="border p-2 w-full rounded"
                />

            </div>



            <div>

                <label>
                    Tasks Completed
                </label>

                <textarea
                    name="tasksCompleted"
                    value={formData.tasksCompleted}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />

            </div>



            <div>

                <label>
                    Tasks Planned For Next Week
                </label>

                <textarea
                    name="tasksPlanned"
                    value={formData.tasksPlanned}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />

            </div>



            <div>

                <label>
                    Blockers / Challenges
                </label>

                <textarea
                    name="blockers"
                    value={formData.blockers}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />

            </div>



            <div>

                <label>
                    Hours Worked
                </label>

                <input
                    type="number"
                    name="hoursWorked"
                    value={formData.hoursWorked}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />

            </div>



            <div>

                <label>
                    Notes / Links
                </label>

                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />

            </div>



            <button
                className="bg-blue-600 text-white px-6 py-3 rounded"
            >

                Submit Report

            </button>



        </form>

    );

}


export default ReportForm;