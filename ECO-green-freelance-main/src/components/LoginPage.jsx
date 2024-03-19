import React, { useState } from 'react';
import login from "../assets/login.PNG"

function LoginPage() {
  const [userType, setUserType] = useState('staff');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
         <div className="flex flex-col justify-center items-center px-6 md:px-12">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <select
          value={userType}
          onChange={handleUserTypeChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="staff">Staff Login</option>
          <option value="manager">Manager Login</option>
          <option value="Guest">Guest Login</option>
        </select>
        <label className="block text-gray-700 font-medium mt-4">
          {userType === 'staff' ? 'Staff ID' : userType === 'manager' ? 'Manager ID' : 'ID'}
        </label>
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter ID"
        />
        <label className="block text-gray-700 font-medium mt-4">Password</label>
        <input
          type="password"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter Password"
        />
        <button
          type="button"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
        >
          Login
        </button>
      </div>
      <div className="md:block">
        <img src={login} alt='login-hero'  className="mt-0.5 mr-0 h-full"/>
      </div>
    </div>
  );
}

export default LoginPage;
