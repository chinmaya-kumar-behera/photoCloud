import React from 'react'

const Header = () => {
  return (
    <header>
      <nav className=" border-gray-300 px-4 lg:px-6 py-2.5 bg-gray-100">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <img
            src="https://i.ibb.co/mvm7ytR/image-removebg-preview.png"
            className="mr-3 h-16"
            alt="photoCloud_Logo"
          />

          <div className="flex items-center lg:order-2">
            <button className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
              Get started
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header