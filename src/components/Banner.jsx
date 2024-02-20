import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="text-black py-24 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="md:w-1/2 space-y-7 px-4">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Explore the new <span className="text-secondary">COLLECTION</span>
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Elegant abaya & handmade design -{" "}
            <span className="text-secondary">"crafted with love"</span>{" "}
            effortlessly delivered to your doorstep!
          </p>
          <Link to="/menu">
            <button className="btn bg-red btn-neutral px-8 py-3 font-semibold text-white rounded-full mt-5">
              Order Now
            </button>
          </Link>
        </div>

        <div className="md:w-1/3">
          <img src="/abayabanner.jpg" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
