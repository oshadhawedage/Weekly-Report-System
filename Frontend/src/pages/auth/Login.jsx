import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";


function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [formData, setFormData] = useState({

        email:"",
        password:""

    });


    const [error,setError] = useState("");



    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };



    const handleSubmit = async(e)=>{

        e.preventDefault();


        try{

            const response = await loginUser(formData);


            const {
                token,
                user
            } = response.data;



            // save authentication state

            login(
                user,
                token
            );



            // redirect based on role

            if(user.role === "MANAGER"){

                navigate("/manager/dashboard");

            }
            else{

                navigate("/member/dashboard");

            }


        }
        catch(error){

            setError(

                error.response?.data?.message ||
                "Login failed"

            );

        }

    };



    return (

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">


            <h1 className="text-3xl font-bold mb-6 text-center">
                Login
            </h1>



            {
                error && (

                    <p className="text-red-500 mb-4">
                        {error}
                    </p>

                )
            }



            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >


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



                <button

                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"

                >

                    Login

                </button>



            </form>



        </div>

    );

}


export default Login;