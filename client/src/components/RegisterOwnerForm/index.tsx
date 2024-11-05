"use client";
import { useRouter } from "next/navigation"; 
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { validateSignup } from "@/app/utils/validationOwner";
import { postSignUpOwner } from "@/app/lib/server/fetchUsers";
import SignUpWithGoogle from "../SignUpGoogle";
import { UserContext } from "@/context/user";
import { neucha, concertOne } from "@/app/lib/server/fonts";

const RegisterOwnerForm = () => {

const router = useRouter();
const {signUpOwner} = useContext(UserContext)

 
  const [signupValues, setSignupValues] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    birthdate: "",
    address: "",
    role: "user"
  });

  const [errors, setErrors] = useState({} as { [key: string]: string });
  const [touched, setTouched] = useState({} as { [key: string]: boolean });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupValues({ ...signupValues, [name]: value });
    setErrors(validateSignup({ ...signupValues, [name]: value }));
  };


  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors(validateSignup(signupValues));
  };

 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    const formErrors = validateSignup(signupValues);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const success = await signUpOwner({
        ...signupValues,
        birthdate: new Date(signupValues.birthdate).toISOString(), 
      });

      if (success) {
        Swal.fire({
          icon: "success",
          title: "User Registered successfully",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
       router.push("/home")
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid User",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-[#fff8e1] rounded-lg shadow-lg my-10">
      <h1 className={`${concertOne.className} text-2xl font-bold mb-6 text-center text-[#f68f53]`}>Owner Register</h1>
      <form onSubmit={handleSubmit}>
      
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              touched.email && errors.email
                ? "border-[#FA7070]" 
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-[#ffb87e] peer`} 
            placeholder="   "
            required
          />
          <label className={`${neucha.className} absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-[#ffb87e] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6`}>
            Email Address
          </label>
          {touched.email && errors.email && (
            <span className="text-[#FA7070] text-xs mt-1">{errors.email}</span> 
          )}
        </div>
  
      
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              touched.password && errors.password
                ? "border-[#FA7070]"
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-[#ffb87e] peer`} 
            placeholder=" "
            required
          />
          <label className={`${neucha.className} absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-[#ffb87e] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6`}>
            Password
          </label>
          {touched.password && errors.password && (
            <span className="text-[#FA7070] text-xs mt-1">{errors.password}</span> 
          )}
        </div>
  
      
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="firstname"
            id="firstname"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              touched.firstname && errors.firstname
                ? "border-[#FA7070]" 
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-[#ffb87e] peer`} 
            placeholder=" "
            required
          />
          <label className={`${neucha.className} absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-[#ffb87e] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6`}>
            First Name
          </label>
          {touched.firstname && errors.firstname && (
            <span className="text-[#FA7070] text-xs mt-1">{errors.firstname}</span> 
          )}
        </div>
  
       
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="lastname"
            id="lastname"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              touched.lastname && errors.lastname
                ? "border-[#FA7070]" 
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-[#ffb87e] peer`} 
            placeholder=" "
            required
          />
          <label className={`${neucha.className} absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-[#ffb87e] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6`}>
            Last Name
          </label>
          {touched.lastname && errors.lastname && (
            <span className="text-[#FA7070] text-xs mt-1">{errors.lastname}</span> 
          )}
        </div>
  
        
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="date"
            name="birthdate"
            id="birthdate"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              touched.birthdate && errors.birthdate
                ? "border-[#FA7070]" 
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-[#ffb87e] peer`} 
            placeholder=" "
            required
          />
          <label className={`${neucha.className} absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-[#ffb87e] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6`}>
            Birthdate
          </label>
          {touched.birthdate && errors.birthdate && (
            <span className="text-[#FA7070] text-xs mt-1">{errors.birthdate}</span> 
          )}
        </div>
  
        
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="address"
            id="address"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              touched.address && errors.address
                ? "border-[#FA7070]" 
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-[#ffb87e] peer`} 
            placeholder=" "
            required
          />
          <label className={`${neucha.className} absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-[#ffb87e] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6`}>
            Address
          </label>
          {touched.address && errors.address && (
            <span className="text-[#FA7070] text-xs mt-1">{errors.address}</span> 
          )}
        </div>
  
        
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className={`${concertOne.className} font-bold w-full py-3 px-5 text-white bg-[#ffa477] hover:bg-[#e6854d] focus:ring-4 focus:ring-[#ffb87e] rounded-lg text-sm transition`} 
        >
          Submit
        </button>
        <h2 className={`${neucha.className} font-bold p-3 text-center`}>Or</h2>
        <div className="text-center">
          <SignUpWithGoogle role={'user'} />
        </div>
        <div className="flex flex-col items-center mt-6">
          <h1 className={`${concertOne.className} text-xl font-semibold text-gray-700`}>
            Have an account?
            <Link
              href="/login"
              className="text-[#FA7070] hover:text-[#B94F4F] ml-2 transition-colors duration-300"
            >
              Log In
            </Link>
          </h1>
        </div>
      </form>
    </div>
  );
}

export default RegisterOwnerForm;
