"use client";
import { useEffect, useState } from "react";
import Button from "./Button";
import { FaGift, FaMap, FaCheckCircle, FaHome } from "react-icons/fa";
import Link from "next/link";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        fixed top-0 left-0 w-full h-15 z-50
        transition-all duration-300
        ${scrolled ? "bg-red-50/80 shadow-lg" : "bg-red-50"}
      `}
    >
      <div className="flex justify-between px-5 w-screen">
        <Link href="/">
          <h1 className="py-3 text-stone-500 text-3xl font-serif">G & I</h1>
        </Link>
        

        <div className="flex gap-3">
          <Button
            label="Confirmação"
            icon={<FaCheckCircle size={20} />}
            link="/confirmation"
          />
          <Button

            label="Local"
            icon={<FaMap size={20} />}
            link="/map"
          />
          <Button

            label="Presentes"
            icon={<FaGift size={20} />}
            link="/gifts"
          />
        </div>
      </div>
      <div
        className="fixed bottom-5 right-5 bg-orange-100 p-3 rounded-full">
        <Link href="/">
          <FaHome size={30}/>
        </Link>
      </div>

    </div>
  );
}
