import React from "react";

const categoryItems = [
  {
    id: 1,
    title: "Sheila",
    des: "(115 Items)",
    image: "/sheila_abaya.jpg",
  },
  {
    id: 2,
    title: "SCARF",
    des: "NEW ARRIVAL",
    image: "/sheila_abaya.jpg",
  },
  {
    id: 3,
    title: "KAAFTANS",
    des: "NEW ARRIVAL",
    image: "/kaftans.jpg",
    width: "400px",
  },
  {
    id: 4,
    title: "NIQAB",
    des: "(115 Items)",
    image: "/niqab.jpg",
  },
  {
    id: 5,
    title: "HIJABS",
    des: "NEW ARRIVAL",
    image: "/BT-Hijab.jpg",
  },
  {
    id: 6,
    title: "Kids Abaya ",
    des: "NEW ARRIVAL",
    image: "/kidabaya.jpg",
  },
];

const Categories = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16">
      <div className="text-center">
        <p className="text-red uppercase tracking-wide font-medium text-lg">
          Customer Favourites
        </p>
        <h2 className="text-4xl md:text-5xl font-bold my-2 md:leading-snug leading-snug">
          Choose Your Type
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12">
        {categoryItems.map((item, i) => (
          <div
            key={i}
            className="shadow-lg rounded-md py-3 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 z-10"
          >
            <div className="w-full mx-auto flex items-center justify-center">
              <img src={item.image} alt="" />
            </div>
            <div className="mt-5 space-y-1">
              <h5 className="text-black font-semibold">{item.title}</h5>
              <p className="text-black text-sm">{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
