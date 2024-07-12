'use client'
import React from "react";
import Image from "next/image";
import Clock from "./Clock";
import Logo from '../public/Group 1.png'

const Navbar = () => {

 
  return (
    <div className="bg-white w-full h-[100px] flex items-center justify-center ">
      <div className="bg-white w-[1180px] h-[78px] flex justify-between items-center">
        <Image src={Logo} alt={"pic"} />
        <h1 className="text-primary-color text-[30px] font-semibold leading-[45px]">Tensai Todo App</h1>
        <div>
            <Clock/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
