'use client'
import { UserContext } from "@/context/user";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

const HomeComponent = () => {
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')

  useEffect(() => {
    const firstname = localStorage.getItem('firstname')
    if(firstname ) setFirstname(firstname)

    const lastname = localStorage.getItem('lastname')
    if(lastname) setLastname(lastname)
  },[])
  
  return ( 
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-[#FAF7F0]">
        <div className="text-left md:w-1/2 space-y-6">
    <h1  className="text-6xl font-bold text-[#B17457]">{"Welcome " + firstname + ' ' + lastname } </h1>
          <h2 style={{fontSize:'2rem'}} className="text-6xl font-bold text-[#B17457]">
            If you have dogs, we'll take care of it.
          </h2>
          <p className="text-3xl text-[#B17457]">
            Travel stress-free while your dogs experience the luxury of loving
            care and comfort at home.
          </p>
        </div>
        <Image
          src="https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg"
          className="rounded-full shadow-lg mt-6 md:mt-0 md:w-1/2"
          alt="Dog image"
          width={500}
          height={500}
        />
      </div>
    
      <div className="flex flex-wrap justify-between gap-6 p-6 bg-[#FAF7F0] pt-36 pb-36">
        <div className="bg-white p-4 rounded-lg shadow-lg text-center w-full md:w-1/6">
          <h1 className="text-4xl font-bold text-[#FA7070]">70.000</h1>
          <span className="block text-lg font-bold text-[#B17457] mt-2">
            Happy Dogs Served
          </span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg text-center w-full md:w-1/6">
          <h1 className="text-4xl font-bold text-[#FA7070]">150.000+</h1>
          <span className="block text-lg font-bold text-[#B17457] mt-2">
            Reservations Completed
          </span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg text-center w-full md:w-1/6">
          <h1 className="text-4xl font-bold text-[#FA7070]">70.000</h1>
          <span className="block text-lg font-bold text-[#B17457] mt-2">
            Happy Dogs Served
          </span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg text-center w-full md:w-1/6">
          <h1 className="text-4xl font-bold text-[#FA7070]">75.000+</h1>
          <span className="block text-lg font-bold text-[#B17457] mt-2">
            5-Star Reviews
          </span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg text-center w-full md:w-1/6">
          <h1 className="text-4xl font-bold text-[#FA7070]">9+</h1>
          <span className="block text-lg font-bold text-[#B17457] mt-2">
            Years in Business
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
