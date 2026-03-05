import React from "react";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* sidebar (hidden on small screens) */}
      <nav className="hidden md:flex w-60 bg-white shadow-md flex-shrink-0 flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-600">QuickHire</h2>
        </div>
        <ul className="space-y-2 px-4">
          <li>
            <Link to="/admin" className="flex items-center p-2 rounded hover:bg-gray-100">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="#" className="flex items-center p-2 rounded hover:bg-gray-100">
              Messages
            </Link>
          </li>
          <li>
            <Link to="#" className="flex items-center p-2 rounded hover:bg-gray-100">
              Company Profile
            </Link>
          </li>
          <li>
            <Link to="#" className="flex items-center p-2 rounded hover:bg-gray-100">
              All Applicants
            </Link>
          </li>
          <li>
            <Link to="#" className="flex items-center p-2 rounded hover:bg-gray-100">
              Job Listing
            </Link>
          </li>
          <li>
            <Link to="#" className="flex items-center p-2 rounded hover:bg-gray-100">
              My Schedule
            </Link>
          </li>
          <li className="mt-4 border-t pt-4">
            <Link to="#" className="flex items-center p-2 rounded hover:bg-gray-100">
              Settings
            </Link>
          </li>
          <li>
            <Link to="#" className="flex items-center p-2 rounded hover:bg-gray-100">
              Help Center
            </Link>
          </li>
        </ul>
      </nav>

      {/* main content area */}
      <div className="flex-1 flex flex-col">
        {/* top header bar */}
        <header className="flex items-center justify-between bg-white p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">Company&nbsp;Nomad</h3>
            <div className="relative">
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
                <span>Nomad</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* dropdown could go here */}
            </div>
          </div>
          <Link
            to="/admin"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Post a job
          </Link>
        </header>

        {/* page content */}
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
