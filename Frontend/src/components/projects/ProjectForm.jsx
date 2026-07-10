import { useEffect,useState } from "react";

import Button from "../common/Button";
import Input from "../common/Input";

function ProjectForm({ onSubmit, initialData = null }) {


    const [formData,setFormData] = useState({

         name: initialData?.name || "",
         description: initialData?.description || ""

    });
    const [fieldErrors, setFieldErrors] = useState({
        name: "",
        description: ""
    });

    useEffect(()=>{

        if(initialData){

            setFormData({

                name: initialData.name,
                description: initialData.description

            });

        }else {

            setFormData({

                  name: "",

                  description: ""

            });

        }

    },[initialData]);



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



    const handleSubmit=(e)=>{

        e.preventDefault();

        const errors = {};

        if (!formData.name.trim()) {
            errors.name = "Project name is required";
        }

        if (!formData.description.trim()) {
            errors.description = "Project description is required";
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        const submissionData = {
            ...formData,
            name: formData.name.trim(),
            description: formData.description.trim()
        };

        onSubmit(submissionData);

        if(!initialData){
          setFormData({

            name:"",
            description:""

          });
        }

    };



    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow space-y-4"
        >


            <div>
                <Input
                    type="text"
                    name="name"
                    placeholder="Project name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(fieldErrors.name)}
                    required
                />
                {fieldErrors.name && (
                    <p className="text-sm text-red-500 mt-1">
                        {fieldErrors.name}
                    </p>
                )}
            </div>

            <div>
                <Input

                as="textarea"

                name="description"
                placeholder="Project description"
                value={formData.description}
                onChange={handleChange}
                aria-invalid={Boolean(fieldErrors.description)}
                required
            />
                {fieldErrors.description && (
                    <p className="text-sm text-red-500 mt-1">
                        {fieldErrors.description}
                    </p>
                )}
            </div>



            <Button type="submit">
                {initialData ? "Update Project" : "Add Project"}
            </Button>


        </form>

    );

}


export default ProjectForm;