import { useEffect,useState } from "react";


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


            <input

                type="text"

                name="name"

                placeholder="Project name"

                value={formData.name}

                onChange={handleChange}

                className="border p-2 rounded w-full"

            />



            <textarea

                name="description"

                placeholder="Project description"

                value={formData.description}

                onChange={handleChange}

                className="border p-2 rounded w-full"

            />



            <button

                className="bg-blue-600 text-white px-5 py-2 rounded"

            >

                {initialData ? "Update Project" : "Add Project"}

            </button>


        </form>

    );

}


export default ProjectForm;