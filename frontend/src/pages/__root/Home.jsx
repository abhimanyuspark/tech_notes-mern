import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <section className="flex gap-2 flex-col">
      <header className="p-2 w-full flex items-center border-b border-white">
        <h1 className="text-2xl font-bold text-center text-gray-100">
          Welcome to DnD Repairs
        </h1>
      </header>

      <main className="p-4 flex gap-4 flex-col h-125">
        <p className="text-gray-300 text-center">
          We provide top-notch computer repair services and technical support.
        </p>
        <address className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-gray-100">Address</h2>
          <p className="text-gray-300">123 Tech Street, Silicon Valley, CA</p>
        </address>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-gray-100">Cool Features</h2>
          <ul className="list-disc list-inside text-gray-300 ml-4">
            <li>Expert Technicians</li>
            <li>Quick Turnaround</li>
            <li>Affordable Prices</li>
            <li>Customer Satisfaction Guaranteed</li>
          </ul>
        </div>
      </main>

      <footer className="flex items-center p-2 border-t border-white">
        <Link to="/login" className="text-md text-blue-500 font-semibold">
          User Login
        </Link>
      </footer>
    </section>
  );
};

export default Home;
