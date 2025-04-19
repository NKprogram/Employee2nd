'use client';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import type { TooltipItem, ChartOptions } from 'chart.js';
import React from 'react';
require('web-streams-polyfill/ponyfill');

// Register the components required for the Pie chart and Histogram
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

export default function Home() {
  // Sample data for the Pie chart
  const pieData = {
    labels: ['Rejected', 'In Review', 'Accepted', 'Update Received', 'Interview Phase'],
    datasets: [
      {
        label: 'Sample Pie Chart',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          '#F7B801',
          '#F35B04',
          '#F18701',
          '#7678ED',
          '#3D348B',
        ],
        borderColor: [
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
        ],
        borderWidth: 3,
      },
    ],
  };

  // Options for the Pie chart
  const pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const, // Change legend position to bottom
        labels: {
          color: '#000000', // Change legend text color to black
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'pie'>) {
            const value = tooltipItem.raw as number; // Cast to number
            return value.toString(); // Show only the number
          },
        },
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF', // Change tooltip body text color to white
      },
    },
  };

  // Sample data for the Histogram
  const barData = {
    labels: ['Cyber Security', 'Software Engineering', 'Dev Ops', 'Full Stack', 'ML', 'Product'],
    datasets: [
      {
        label: 'Field Distribution',
        data: [20, 30, 15, 25, 10, 5],
        backgroundColor: [
          '#6A5ACD', // SlateBlue
          '#7B68EE', // MediumSlateBlue
          '#87CEFA', // LightSkyBlue
          '#4682B4', // SteelBlue
          '#4169E1', // RoyalBlue
          '#6495ED', // CornflowerBlue
        ],
        borderColor: '#FFFFFF',
        borderWidth: 1,
      },
    ],
  };

  // Options for the Histogram
  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'bar'>) {
            const value = tooltipItem.raw as number; // Cast to number
            return value.toString(); // Show only the number
          },
        },
        titleColor: '#000000',
        bodyColor: '#FFFFFF', // Change tooltip body text color to white
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#000000', // Change x-axis text color to black
        },
      },
      y: {
        ticks: {
          color: '#000000', // Change y-axis text color to black
        },
      },
    },
  };
  const h1Style = {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333', // Dark gray color for professionalism
    marginBottom: '1rem',
  };
  // Sample job data for the table
  const jobData = [
    { 
      date: '2024-08-15', 
      type: 'Interview', 
      position: 'Software Engineer', 
      company: 'Product Hub', 
      format: 'Online', 
      progress: 'In Progress' 
    },
    { 
      date: '2024-08-20', 
      type: 'Offer', 
      position: 'Data Scientist', 
      company: 'Quantum Byte Solutions', 
      format: 'In Person', 
      progress: 'Accepted' 
    },
    { 
      date: '2024-07-30', 
      type: 'Interview', 
      position: 'UX Designer', 
      company: 'NexaTech Innovations', 
      format: 'Online', 
      progress: 'Rejected' 
    },
    { 
      date: '2024-09-05', 
      type: 'Online Assessment', 
      position: 'Project Manager', 
      company: 'CloudForge Systems', 
      format: 'N/A', 
      progress: 'Upcoming' 
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-8 space-y-8">
      {/* Title of the webpage */}
      
      {/* Welcome text below the title */}
      <div className="mt-2">
        <h2 className="text-2xl font-medium text-gray-800" style = {h1Style}>Welcome!</h2>
      </div>
      <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900" style={{fontFamily: '"Roboto", sans-serif', fontSize: '1.5rem', fontWeight: 'bold', paddingTop:"-10px", marginLeft:"-600px"}}>Application Summary</h2>
      </div>

      <div className="flex justify-between w-full max-w-screen-lg space-x-8">
        <div style={{ width: '400px', height: '400px', marginRight: '0px', marginLeft: '0px', marginTop: '-80px' }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
        <div className="flex justify-center items-center" style={{ width: '500px', height: '400px', marginTop: '-70px' }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <div className="w-full overflow-x-auto container mx-auto p-8" style={{marginTop: "-50px", marginBottom: "20px"}}>
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900" style={{fontFamily: '"Roboto", sans-serif', fontSize: '1.5rem', fontWeight: 'bold',}}>Upcoming</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Format</th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobData.map((job, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.format}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
