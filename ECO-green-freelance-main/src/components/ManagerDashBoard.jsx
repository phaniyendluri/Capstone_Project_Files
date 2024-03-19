import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

function ManagerDashboard() {
  const [activeSection, setActiveSection] = useState('Data Entry');
  
 
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard mt-8">
    <div className="headings flex justify-center items-center mb-5 gap-5 space-x-5">
      <button
        className={`
          relative flex items-center py-2 px-4 text-sm leading-6 font-semibold focus:outline-none rounded-md shadow-sm hover:border-green-500 hover:text-green-700
          ${activeSection === 'Data Entry' ? 'bg-green-100 border-b-2 border-green-600' : 'bg-gray-100'}
        `}
        onClick={() => handleSectionChange('Data Entry')}
      >
        Data Entry
        {activeSection === 'Data Entry' && ( // Active state indicator
          <span className="absolute inset-0 bg-gradient-to-br from-green-100 to-gray-100 rounded-full blur-sm opacity-75"></span>
        )}
      </button>
      <button
        className={`
          relative flex items-center py-2 px-4 text-sm leading-6 font-semibold focus:outline-none rounded-md shadow-sm hover:border-green-500 hover:text-green-700
          ${activeSection === 'Reports' ? 'bg-green-100 border-b-2 border-green-600' : 'bg-gray-100'}
        `}
        onClick={() => handleSectionChange('Reports')}
      >
        Reports
        {activeSection === 'Reports' && ( // Active state indicator
          <span className="absolute inset-0 bg-gradient-to-br from-green-100 to-gray-100 rounded-full blur-sm opacity-75"></span>
        )}
      </button>
    </div>
    {activeSection === 'Data Entry' && <DataEntry />}
    {activeSection === 'Reports' && <Reports />}
  </div>
  );
}


function DataEntry() {
  const [formData, setFormData] = useState({
    date: '',
    weight: '',
    type: 'landfill',
    expense: '',
    category: '',
    subCategory: '',
    revenue: '',
    buyerId: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = { ...formData };
    console.log(newEntry); // You can handle the submission of newEntry here
    setFormData({
      date: '',
      weight: '',
      type: 'landfill',
      expense: '',
      category: '',
      subCategory: '',
      revenue: '',
      buyerId: '',
    });
  };

  const renderAdditionalFields = () => {
    switch (formData.type) {
      case 'landfill':
        return (
          <>
            <label htmlFor="expense" className="block text-gray-700 font-medium mt-4">
              Expense:
            </label>
            <input
              type="text"
              id="expense"
              name="expense"
              value={formData.expense}
              onChange={handleInputChange}
              required
              className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </>
        );
      case 'recyclables':
        return (
          <>
            <label htmlFor="category" className="block text-gray-700 font-medium mt-4">
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="cardboard">Cardboard</option>
              <option value="paper">Paper</option>
              <option value="glass">Glass</option>
              <option value="metal">Metal</option>
              <option value="plastic">#1 PET</option>
              <option value="plastic">#2 HDPE Colored</option>
              <option value="plastic">#2 HDPE Natural</option>
            </select>
            {renderSubCategory()}
            <label htmlFor="revenue" className="block text-gray-700 font-medium mt-4">
              Revenue:
            </label>
            <input
              type="text"
              id="revenue"
              name="revenue"
              value={formData.revenue}
              onChange={handleInputChange}
              required
              className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </>
        );
      default:
        return null;
    }
  };

  const renderSubCategory = () => {
    switch (formData.category) {
      case 'paper':
        return (
          <>
            <label htmlFor="subCategory" className="block text-gray-700 font-medium mt-4">
              Sub Category:
            </label>
            <select
              id="subCategory"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleInputChange}
              className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select Sub Category</option>
              <option value="mixedPaper">Mixed Paper</option>
              <option value="newspaper">Newspaper</option>
              <option value="whiteOffice">White Office</option>
            </select>
          </>
        );
      case 'metal':
        return (
          <>
            <label htmlFor="subCategory" className="block text-gray-700 font-medium mt-4">
              Sub Category:
            </label>
            <select
              id="subCategory"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleInputChange}
              className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select Sub Category</option>
              <option value="aluminum">Aluminum</option>
              <option value="foodCans">Food Cans</option>
              <option value="scrapMetal">Scrap Metal</option>
            </select>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1 items-center">
        <label htmlFor="date" className="block text-gray-700 font-medium mt-4">
          Date:
        </label>
        <input
          type="text"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
          className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label htmlFor="weight" className="block text-gray-700 font-medium mt-4">
          Weight (lbs):
        </label>
        <input
          type="text"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          required
          className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label htmlFor="type" className="block text-gray-700 font-medium mt-4">
          Type:
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        >
          <option value="landfill">Landfill</option>
          <option value="compost">Compost</option>
          <option value="recyclables">Recyclables</option>
        </select>
        {renderAdditionalFields()}
        <label htmlFor="buyerId" className="block text-gray-700 font-medium mt-4">
          Buyer ID:
        </label>
        <input
          type="text"
          id="buyerId"
          name="buyerId"
          value={formData.buyerId}
          onChange={handleInputChange}
          required
          className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
        >
          Submit
        </button>
      </form>
      <h2 className="text-center text-xl font-bold mt-4">Dummy Data Table</h2>
      <table className="w-full table-auto shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium">
            <th className="px-4 py-2">FY24</th>
            <th className="px-4 py-2">Jul-23</th>
            <th className="px-4 py-2">Aug-23</th>
            <th className="px-4 py-2">Sep-23</th>
            <th className="px-4 py-2">Oct-23</th>
            <th className="px-4 py-2">Nov-23</th>
            <th className="px-4 py-2">Dec-23</th>
            <th className="px-4 py-2">Jan-24</th>
            <th className="px-4 py-2">Feb-24</th>
            <th className="px-4 py-2">Mar-24</th>
            <th className="px-4 py-2">Apr-24</th>
            <th className="px-4 py-2">May-24</th>
            <th className="px-4 py-2">Jun-24</th>
            <th className="px-4 py-2">Item Totals</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">Recycling Revenue</td>
            <td className="px-4 py-2">35.00</td>
            <td className="px-4 py-2">14,057.82</td>
            <td className="px-4 py-2">4,582.22</td>
            <td className="px-4 py-2">18,675.04</td>
            {/* Add more data as needed */}
          </tr>
          <tr>
            <td className="px-4 py-2">Landfill lbs.</td>
            <td className="px-4 py-2">47,845</td>
            <td className="px-4 py-2">75,600</td>
            <td className="px-4 py-2">79,800</td>
            <td className="px-4 py-2">203,245</td>
            {/* Add more data as needed */}
          </tr>
          <tr>
            <td className="px-4 py-2">Compost</td>
            <td className="px-4 py-2">7,100</td>
            <td className="px-4 py-2">10,360</td>
            <td className="px-4 py-2">28,800</td>
            <td className="px-4 py-2">46,260</td>
            {/* Add more data as needed */}
          </tr>
          {/* Add more rows for other data */}
        </tbody>
      </table>
    </div>
  );
}


function Reports() {
  const salesByCategoryData = {
    labels: ['Electronics', 'Clothing', 'Home & Garden', 'Food'],
    datasets: [{
      label: 'Sales',
      data: [10000, 8000, 6000, 4000],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
    }],
  };

  const topProductsData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [{
      label: 'Units Sold',
      data: [2000, 1500, 1200, 800],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
    }],
  };

  const monthlySalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Monthly Sales',
      data: [5000, 6000, 8000, 9000, 7000, 8500, 10000, 8000, 7500, 9000, 6000, 7000],
      backgroundColor: 'rgba(99, 132, 255, 0.2)',
      borderColor: 'rgba(99, 132, 255, 1)',
    }],
  };

  const salesByRegionData = {
    labels: ['North', 'South', 'East', 'West'],
    datasets: [{
      label: 'Sales',
      data: [30, 25, 20, 25],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
    }],
  };

  const renderChart = (canvasId, chartData, chartType = 'bar') => {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const existingChart = Chart.getChart(ctx); // Check for existing chart
  
      if (existingChart) {
        existingChart.destroy(); // Destroy existing chart if found
      }
  
      new Chart(ctx, {
        type: chartType,
        data: chartData,
        options: {
          // ... your options
        },
      });
    } else {
      console.error(`Canvas element with id '${canvasId}' not found.`);
    }
  };

  useEffect(() => {
    renderChart('salesByCategoryChart', salesByCategoryData);
    renderChart('topProductsChart', topProductsData, 'doughnut');
    renderChart('monthlySalesChart', monthlySalesData, 'line');
    renderChart('salesByRegionChart', salesByRegionData, 'pie');
  }, []); // Empty dependency array ensures useEffect runs only once after initial render


  // const [salesByCategoryData, setSalesByCategoryData] = useState({});
  // const [topProductsData, setTopProductsData] = useState({});
  // const [monthlySalesData, setMonthlySalesData] = useState({});
  // const [salesByRegionData, setSalesByRegionData] = useState({});

  // // Fetch sample data (replace with your API call)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('https://your-api.com/report-data'); // Replace with your API endpoint
  //     const data = await response.json();
  //     setSalesByCategoryData(data.salesByCategory);
  //     setTopProductsData(data.topProducts);
  //     setMonthlySalesData(data.monthlySales);
  //     setSalesByRegionData(data.salesByRegion);
  //   };
  //   fetchData();
  // }, []);

  // const renderChart = (canvasId, chartData, chartType = 'bar') => {
  //   const ctx = document.getElementById(canvasId).getContext('2d');
  //   new Chart(ctx, {
  //     type: chartType,
  //     data: chartData,
  //     options: {
  //       // Add your desired chart options here (e.g., scales, legends, etc.)
  //     },
  //   });
  // };
  // Implement your chart generation logic based on DataEntry data
  return (
    <div className="container mx-auto py-8">
      <h2>Sales Report</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card rounded-lg shadow-md p-4">
          <h3>Sales by Category</h3>
          <canvas id="salesByCategoryChart" />
        </div>
        <div className="card rounded-lg shadow-md p-4">
          <h3>Top Selling Products</h3>
          <canvas id="topProductsChart" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="card rounded-lg shadow-md p-4">
          <h3>Monthly Sales Trend</h3>
          <canvas id="monthlySalesChart" />
        </div>
        <div className="card rounded-lg shadow-md p-4">
          <h3>Sales by Region</h3>
          <canvas id="salesByRegionChart" />
        </div>
      </div>
      {renderChart('salesByCategoryChart', salesByCategoryData)}
      {renderChart('topProductsChart', topProductsData, 'doughnut')} // Example of using a different chart type
      {renderChart('monthlySalesChart', monthlySalesData, 'line')}
      {renderChart('salesByRegionChart', salesByRegionData, 'pie')}
    </div>
  );
}

export default ManagerDashboard;
