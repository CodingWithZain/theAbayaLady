import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
const Card = ({ item }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { name, image, price, description, _id } = item;
  const { user } = useContext(AuthContext);
  console.log(user);
  const AddtoCartHandle = (item) => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };
      fetch("http://localhost:8080/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              title: "Item added on the cart",
              showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `,
              },
              hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `,
              },
            });
          }
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Please Login!",
        text: "Without an account can't able to add products.",
        footer: '<a href="/">Back to Home</a>',
        confirmButtonText: "Signup First!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };

  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-primary ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>

      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt=""
            className="hover:scale-105 transition-all duration-300 md:h-72"
          />
        </figure>
      </Link>

      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">PKR</span> {item.price}
          </h5>
          <button
            className="btn bg-red text-white"
            onClick={() => {
              AddtoCartHandle(item);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
