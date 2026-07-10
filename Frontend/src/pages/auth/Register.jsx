import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
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
    const [fieldErrors, setFieldErrors] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });


    const handleChange = (e)=>{

        setFormData((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }));

        setFieldErrors((prev)=>({
            ...prev,
            [e.target.name]: ""
        }));
        setError("");

    };



    const handleSubmit = async(e)=>{

        e.preventDefault();

        const errors = {};

        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Enter a valid email address";
        }

        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (!formData.role) {
            errors.role = "Role is required";
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setError("");
            return;
        }

        try{

            await registerUser({

              name: formData.name.trim(),

              email: formData.email.trim(),

              password: formData.password,

              role: formData.role

            });

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

        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
            <div className="mb-6 flex flex-col items-center text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-500 text-xl font-bold text-white shadow-lg shadow-indigo-200">
                    WR
                </div>
                <h1 className="text-3xl font-bold text-slate-800">
                    Create Account
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Join Weekly Report System and start managing reports
                </p>
            </div>


            {error && (
                <p className="text-red-500 mb-4">
                    {error}
                </p>
            )}



            <form 
                onSubmit={handleSubmit}
                className="space-y-4"
            >


                <div>
                    <Input
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.name)}
                    />
                    {fieldErrors.name && (
                        <p className="text-sm text-red-500 mt-1">
                            {fieldErrors.name}
                        </p>
                    )}
                </div>

                <div>
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.email)}
                    />
                    {fieldErrors.email && (
                        <p className="text-sm text-red-500 mt-1">
                            {fieldErrors.email}
                        </p>
                    )}
                </div>

                <div>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.password)}
                    />
                    {fieldErrors.password && (
                        <p className="text-sm text-red-500 mt-1">
                            {fieldErrors.password}
                        </p>
                    )}
                </div>



                <Input
                    as="select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    aria-invalid={Boolean(fieldErrors.role)}
                >

                    <option value="MEMBER">
                        Team Member
                    </option>


                    <option value="MANAGER">
                        Manager
                    </option>

                </Input>

                {fieldErrors.role && (
                    <p className="text-sm text-red-500 mt-1">
                        {fieldErrors.role}
                    </p>
                )}

                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                >
                    Register
                </Button>


            </form>


        </div>

    );

}


export default Register;