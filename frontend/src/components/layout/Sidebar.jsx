import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBoxesPacking, faBoxesStacked, faChartPie, faFilter, faLayerGroup, faRightFromBracket, faXmark } from "@fortawesome/free-solid-svg-icons";


function Sidebar({ className }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const redirects = {
    home: () => { navigate("/"); toggleSidebar(); },
    categories: () => { navigate("/admin/categories"); toggleSidebar(); },
    dashboard: () => { navigate("/admin/dashboard"); toggleSidebar(); },
    filters: () => { navigate("/admin/filters"); toggleSidebar(); },
    orders: () => { navigate("/admin/orders"); toggleSidebar(); },
    products: () => { navigate("/admin/products"); toggleSidebar(); },
  };

  return (
    <div className={className}>
      {/* Drawer toggle arrow */}
      {!sidebarOpen && (
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 absolute left-0 top-0 mt-5 ml-5 z-50"
          type="button"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon className="w-5 h-5" icon={faArrowRight} />
          <span className="sr-only">Icon description</span>
        </button>
      )}

      {/* drawer component */}
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${sidebarOpen ? "" : "-translate-x-full"
          } bg-white dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Menu
        </h5>
        <button type="button" onClick={toggleSidebar} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
          <FontAwesomeIcon className="w-5 h-5" icon={faXmark} />
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a onClick={redirects.dashboard} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FontAwesomeIcon icon={faChartPie} />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>

            <li>
              <a onClick={redirects.categories} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FontAwesomeIcon icon={faLayerGroup} />
                <span className="flex-1 ms-3 whitespace-nowrap">Categories</span>
              </a>
            </li>

            <li>
              <a onClick={redirects.products} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FontAwesomeIcon icon={faBoxesStacked} />
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </a>
            </li>

            <li>
              <a onClick={redirects.filters} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FontAwesomeIcon icon={faFilter} />
                <span className="flex-1 ms-3 whitespace-nowrap">Filters</span>
              </a>
            </li>

            <li>
              <a onClick={redirects.orders} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FontAwesomeIcon icon={faBoxesPacking} />
                <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
              </a>
            </li>

            <li>
              <a onClick={redirects.home} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span className="flex-1 ms-3 whitespace-nowrap">Return</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;