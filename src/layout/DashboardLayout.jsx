import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import {
  FaEdit,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaRegUser,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import logo from "/mainlogo.png";
import Login from "../components/Login";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const DashboardLayout = () => {
  const { loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const sharedLinks = (
    <>
      <li className="mt-3">
        <Link to="/">
          <MdDashboard /> Home
        </Link>
      </li>
      <li>
        <Link to="/menu">
          <FaCartShopping /> Menu
        </Link>
      </li>
      <li>
        <Link to="/menu">
          <FaLocationArrow /> Orders Tracking
        </Link>
      </li>
      <li>
        <Link to="/menu">
          <FaQuestionCircle /> Customer Support
        </Link>
      </li>
    </>
  );

  return (
    <div>
      {isAdmin ? (
        <div className="drawer sm:drawer-open ">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-center sm:justify-center my-2">
            {/* Page content here */}
            <div className="flex items-center justify-between mx-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                <MdDashboardCustomize />
              </label>
              <button className="btn rounded-full px-6 bg-red text-white gap-2 sm:hidden">
                <FaRegUser /> Logout
              </button>
            </div>
            <div className="mt-5 md:mt-2 mx-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <li>
                <Link>
                  <img src={logo} className="w-20" />
                  <span className="badge badge-success text-white font-bold">
                    Admin Panel
                  </span>
                </Link>
              </li>
              <hr />
              <li className="mt-3">
                <Link to="/dashboard">
                  <MdDashboard /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <FaShoppingBag /> Manage Bookings
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-menu">
                  <FaPlusCircle />
                  Add Menu
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-items">
                  <FaEdit /> Manage Items
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/dashboard/users">
                  <FaUser /> All Users
                </Link>
              </li>

              <hr />

              {sharedLinks}
            </ul>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default DashboardLayout;
