import { useEffect,useState } from "react";

import Button from "../common/Button";
import Input from "../common/Input";

function ProjectForm({ onSubmit, initialData = null }) {


    const [formData,setFormData] = useState({

         name: initialData?.name || "",
         description: initialData?.description || ""

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

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };



    const handleSubmit=(e)=>{

        e.preventDefault();

        onSubmit(formData);

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


            <Input

                type="text"

                name="name"

                placeholder="Project name"

                value={formData.name}

                onChange={handleChange}

            />



            <Input

                as="textarea"

                name="description"

                placeholder="Project description"

                value={formData.description}

                onChange={handleChange}

            />



            <Button type="submit">
                {initialData ? "Update Project" : "Add Project"}
            </Button>


        </form>

    );

}


export default ProjectForm;