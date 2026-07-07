import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authService";


function Register() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "MEMBER"
    });


    const [error, setError] = useState("");



    const handleChange = (e)=>{

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };



    const handleSubmit = async(e)=>{

        e.preventDefault();

        try{

            await registerUser(formData);

            navigate("/");

        }
        catch(error){

            setError(
                error.response?.data?.message ||
                "Registration failed"
            );

        }

    };



    return (

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">


            <h1 className="text-3xl font-bold mb-6 text-center">
                Create Account
            </h1>


            {error && (
                <p className="text-red-500 mb-4">
                    {error}
                </p>
            )}



            <form 
                onSubmit={handleSubmit}
                className="space-y-4"
            >


                <input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />


                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />



                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />



                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                >

                    <option value="MEMBER">
                        Team Member
                    </option>


                    <option value="MANAGER">
                        Manager
                    </option>

                </select>



                <button
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                >
                    Register
                </button>


            </form>


        </div>

    );

}


export default Register;