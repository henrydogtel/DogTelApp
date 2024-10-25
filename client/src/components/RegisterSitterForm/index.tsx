"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { postSignUpSitter } from "@/app/lib/server/fetchUsers";
import { validateSignup } from "@/app/utils/validationSitter";

const RegisterSitterForm = () => {
  const router = useRouter();
  const [signupValues, setSignupValues] = useState({
    firstname: "",
    lastname: "",
    birthdate: new Date(),
    email: "",
    password: "",
    address: "",
    role: "sitter",
    fee: 0,
    descripcion: "",
  });

  const [errors, setErrors] = useState({} as { [key: string]: string });
  const [touched, setTouched] = useState({} as { [key: string]: boolean });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSignupValues({ ...signupValues, [name]: value });

    // Validar el campo actualizado
    setErrors(validateSignup({ ...signupValues, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });

    // Validar al perder el foco
    setErrors(validateSignup(signupValues));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await postSignUpSitter(signupValues);
    if (success) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "User Registered successfully",
      });
      router.push("/home");
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Invalid User",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg my-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Sitter Register</h1>
      <form onSubmit={handleSubmit}>
        {/** Email field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              touched.email && errors.email
                ? "border-red-500"
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email Address
          </label>
          {touched.email && errors.email && (
            <span className="text-red-500 text-xs mt-1">{errors.email}</span>
          )}
        </div>

        {/** Password field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              touched.password && errors.password
                ? "border-red-500"
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
          {touched.password && errors.password && (
            <span className="text-red-500 text-xs mt-1">{errors.password}</span>
          )}
        </div>

        {/** First Name field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="firstname"
            id="firstname"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              touched.firstname && errors.firstname
                ? "border-red-500"
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            First Name
          </label>
          {touched.firstname && errors.firstname && (
            <span className="text-red-500 text-xs mt-1">{errors.firstname}</span>
          )}
        </div>

        {/** Last Name field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="lastname"
            id="lastname"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              touched.lastname && errors.lastname
                ? "border-red-500"
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            Last Name
          </label>
          {touched.lastname && errors.lastname && (
            <span className="text-red-500 text-xs mt-1">{errors.lastname}</span>
          )}
        </div>

         {/** Birthdate field */}
         <div className="relative z-0 w-full mb-6 group">
          <input
            type="date"
            name="birthdate"
            id="birthdate"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              touched.birthdate && errors.birthdate
                ? "border-red-500"
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            Birthdate
          </label>
          {touched.birthdate && errors.birthdate && (
            <span className="text-red-500 text-xs mt-1">{errors.birthdate}</span>
          )}
        </div>

        {/** Address field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="address"
            id="address"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              touched.address && errors.address
                ? "border-red-500"
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            Address
          </label>
          {touched.address && errors.address && (
            <span className="text-red-500 text-xs mt-1">{errors.address}</span>
          )}
        </div>

        {/** Fee field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="fee"
            id="fee"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              touched.fee && errors.fee
                ? "border-red-500"
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            Fee
          </label>
          {touched.fee && errors.fee && (
            <span className="text-red-500 text-xs mt-1">{errors.fee}</span>
          )}
        </div>

        {/** Description field */}
        <div className="relative z-0 w-full mb-6 group">
          <textarea
            name="descripcion"
            id="descripcion"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              touched.descripcion && errors.descripcion
                ? "border-red-500"
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            rows={4}
            required
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            Description
          </label>
          {touched.descripcion && errors.descripcion && (
            <span className="text-red-500 text-xs mt-1">{errors.descripcion}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterSitterForm;
