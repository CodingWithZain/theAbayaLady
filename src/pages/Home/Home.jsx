import React from "react";
import Banner from "../../components/Banner";
import Categories from "./Categories";
import Categorieslist from "./Categorieslist";
import Carousel from "./Carousel";
import Brands from "./Brands";
import Testimonials from "./Testimonials";
const Home = () => {
  return (
    <>
      <Banner />
      <Carousel />
      <Categories />
      <Categorieslist />
      <Testimonials />
      <Brands />
    </>
  );
};

export default Home;
