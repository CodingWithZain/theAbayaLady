import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:8080/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }

            return cartItem;
          });

          refetch();
          setCartItems(updatedCart);
        });
      refetch();
    } else {
      alert("items cant be zero");
    }
  };

  const handleIncrease = (item) => {
    fetch(`http://localhost:8080/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }

          return cartItem;
        });

        refetch();
        setCartItems(updatedCart);
      });
    refetch();
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your Item has been deleted",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const cartTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = cartTotal;

  return (
    <div className="section-container">
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items added to the <span className="text-red">Shopping Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {cart.length > 0 ? (
        <div>
          <div className="">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-red text-white rounded-sm">
                  <tr>
                    <th>#</th>
                    <th>Dress</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={item.image}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">
                        {item.name}
                        <br />
                      </td>
                      <button
                        className="btn btn-xs"
                        onClick={() => {
                          {
                            handleDecrease(item);
                          }
                        }}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={() => {
                          console.log(item.quantity);
                        }}
                        className="w-10 mx-2 text-center overflow-hidden appearance-none my-3"
                      />
                      <button
                        className="btn btn-xs"
                        onClick={() => {
                          {
                            handleIncrease(item);
                          }
                        }}
                      >
                        +
                      </button>
                      <td>RS: {calculatePrice(item).toFixed(2)}</td>
                      <th>
                        <button
                          className="btn btn-ghost bg-red text-white btn-xs"
                          onClick={() => {
                            {
                              handleDelete(item);
                            }
                          }}
                        >
                          <FaTrash />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <hr />
          <div className="my-12 flex flex-col md:flex-row justify-between items-start">
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                Customer Details
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Name: {user?.displayName}
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Email: {user?.email}
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                User ID: {user?.uid}
              </p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                Shopping Details
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Total Items: {cart.length}
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Total Price: {orderTotal.toFixed(2)} PKR
              </p>
              <Link to="/process-checkout">
                <button className="btn btn-neutral bg-red text-white">
                  Procceed Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20 font-mono">
          <p>Cart is empty. Please add products.</p>
          <Link to="/menu">
            <button className="btn bg-red text-white mt-3">
              Back to Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
