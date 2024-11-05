"use client";

import { UserContext } from "@/context/user";
import { ILoginUser, IRegisterSitter, IRegisterUser, IRegisterUserGoogle, IUserResponse } from "@/interfaces/interfaces";
import { signIn, useSession, UseSessionOptions, signOut } from "next-auth/react";
import Image from "next/image";
import {useRouter} from 'next/navigation'
import { Router } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { isNull } from "util";

interface ISignUpWithGoole {
  role: string
}

const SignUpWithGoogle:React.FC<ISignUpWithGoole> =  ({role}) => {

  const {data: session, status, update} = useSession()
  const {setUser, signUpSitter, signUpOwner} = useContext(UserContext)
  const { signIn: googleSignIn } = useContext(UserContext);
  const [registered, setRegistered] = useState(false)
  
  const router = useRouter()

  const names:Array<string> | undefined | null = session?.user?.name?.split(' ')  
  
  
  useEffect(() => {
  
    console.log(role);
    let email: any = session?.user?.email
    console.log(status);
    console.log(session);
    

    // setTimeout(() => {
    //   console.log(userLocal);
    //   console.log(userLocal === null);
      
    //   if(status === 'authenticated' && userLocal !== null) {
    //     signOut()
    //   }
    // }, 4000);
    
    
    if(status === 'authenticated') {
      let firstname = ''
      let lastname = ''
    
      names?.forEach((element,index) => {
        if(index === 0) {
          firstname = element
        } else if(index === 1) {
          lastname = element
        }
       
      })
      
        
       
        if(role === 'sitter') {
         

          const userSave:IRegisterSitter = {
            firstname,
            lastname,
            birthdate: new Date('08-08-1998'),
            email,
            password: email + 'secret',
            address:'no google address',
            fee:0,
            descripcion:'registered by google',
            role
      
          }

          const signUpSitterAsync = async () => {
            const response = await signUpSitter(userSave)
            if(response) {
              Swal.fire({
                icon: "success",
                title: "Registered successfully",
                position: "top-end",
                toast: true,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              });
              setRegistered(true)
             
            } else {
              Swal.fire({
                icon: "error",
                title: "Error generating user",
                position: "top-end",
                toast: true,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              });
              
            }

          }
    
          signUpSitterAsync()
    
        } else if(role === 'user') {
          
          const userSave:IRegisterUser = {
            firstname,
            lastname,
            birthdate:'08-08-1998',
            email,
            password:email + 'secret',
            address:'no google adrres',
            role
      
          }

          
          const signUpOwnerAsync = async () => {
            
            const response = await signUpOwner(userSave)
            if(response) {
              Swal.fire({
                icon: "success",
                title: "Registered successfully",
                position: "top-end",
                toast: true,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              });
             
            } else {
              Swal.fire({
                icon: "error",
                title: "Error generating user",
                position: "top-end",
                toast: true,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              });
              
            }

          }

          signUpOwnerAsync()
    
      
         
        } else if (role === 'signin') {
          
          const userLogin:ILoginUser = {
            email,
            password:email+'secret'
          }
          const sesion = async () => {
            const success = await googleSignIn(userLogin)
            if (success) {
              Swal.fire({
                icon: "success",
                title: "Signed in successfully",
                position: "top-end",
                toast: true,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              });
             
              return
              // Si necesitas almacenar el token o el rol, hazlo aquí
              // localStorage.setItem('accessToken', result.accessToken);
              
            
            } else {
              Swal.fire({
                icon: "error",
                title: "Invalid Credentials",
                position: "top-end",
                toast: true,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              });
              
            }
          }
          sesion()
          
        }

             
    }

    // setTimeout(() => {
    //   if(status === 'authenticated') window.location.pathname = '/home'

    // }, 3000);


    return(() => {
     
     if(status === 'authenticated' && localStorage.getItem('user') === null) {
      
      signOut()
     } 

    })
    
  },[status])
  


return (
    <div className="flex justify-center">
      <button
        onClick={() => signIn()}
        className="w-full flex items-center justify-center py-3 px-5 text-white bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
      >
        <Image
          src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
          alt="Google logo"
          className="w-5 h-5 mr-2"
          width={20}
          height={20}
        />
        <span className="text-gray-800">Continue with Google</span>
      </button>
    </div>
  );
  }

  
  
;

export default SignUpWithGoogle;