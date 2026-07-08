import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
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

        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
            <div className="mb-6 flex flex-col items-center text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-500 text-xl font-bold text-white shadow-lg shadow-indigo-200">
                    WR
                </div>
                <h1 className="text-3xl font-bold text-slate-800">
                    Welcome Back
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Sign in to your Weekly Report System account
                </p>
            </div>



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


                <Input

                    name="email"

                    type="email"

                    placeholder="Email"

                    value={formData.email}

                    onChange={handleChange}

                />



                <Input

                    name="password"

                    type="password"

                    placeholder="Password"

                    value={formData.password}

                    onChange={handleChange}

                />



                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                >
                    Login
                </Button>



            </form>



        </div>

    );

}


export default Login;