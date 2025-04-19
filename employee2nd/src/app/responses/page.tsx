"use client"
import React from 'react';
import { DataGrid,GridRowsProp,GridColDef } from '@mui/x-data-grid'; 
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode'
import ComputerIcon from '@mui/icons-material/Computer'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import FunctionsIcon from '@mui/icons-material/Functions'
import InsightsIcon from '@mui/icons-material/Insights'
import CloudIcon from '@mui/icons-material/Cloud'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import SecurityIcon from '@mui/icons-material/Security'
import LayersIcon from '@mui/icons-material/Layers'
import LanguageIcon from '@mui/icons-material/Language'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import CalendarIcon from '@mui/icons-material/CalendarMonth'
import CelebrationIcon from '@mui/icons-material/Celebration';

const h1Style = {
  fontFamily: '"Roboto", sans-serif',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#333', // Dark gray color for professionalism
  marginBottom: '1rem',
};

const h2Style = {
  fontFamily: '"Roboto", sans-serif',
  fontSize: '1.5rem',
  fontWeight: 'normal',
  color: '#666', // Medium gray color for secondary text
  marginBottom: '2rem',
};


const rows: GridRowsProp = [
  { id: 1, col1: 'Software Developer', col2: 'Tech Innovations', col3: 'Interview', col4: 'In-person', col5: '2023-10-05' },
  { id: 2, col1: 'Computer Engineer', col2: 'Hardware Solutions', col3: 'Offer', col4: 'N/A', col5: '2023-10-06' },
  { id: 3, col1: 'Product Manager', col2: 'Product Hub', col3: 'Online Assessment', col4: 'Online', col5: '2023-10-07' },
  { id: 4, col1: 'Machine Learning Engineer', col2: 'AI Ventures', col3: 'Interview', col4: 'In-person', col5: '2023-10-08' },
  { id: 5, col1: 'Data Scientist', col2: 'Data Analytics Ltd.', col3: 'Rejected', col4: 'N/A', col5: '2023-10-09' },
  { id: 6, col1: 'Devops', col2: 'CloudNet Systems', col3: 'Interview', col4: 'Online', col5: '2023-10-10' },
  { id: 7, col1: 'AI Developer', col2: 'AI Labs', col3: 'Offer', col4: 'N/A', col5: '2023-10-11' },
  { id: 8, col1: 'CyberSecurity', col2: 'SecureTech Inc.', col3: 'Rejected', col4: 'N/A', col5: '2023-10-12' },
  { id: 9, col1: 'Full Stack', col2: 'Full Solutions', col3: 'Interview', col4: 'In-person', col5: '2023-10-14' },
  { id: 10, col1: 'WebDev', col2: 'Web Innovations', col3: 'Offer', col4: 'N/A', col5: '2023-10-15' },
  { id: 11, col1: 'UX Designer', col2: 'Creative UX Studio', col3: 'Online Assessment', col4: 'Online', col5: '2023-10-16' }
];

// Column definitions for DataGrid
const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Position', width: 200, flex: 1, 
    renderCell: (params) => (
      <>
        {getTitleIcon(params.value)}
        {params.value}
      </>
    )
  },
  { field: 'col2', headerName: 'Company', width: 200, flex: 1 },
  { field: 'col3', headerName: 'Response Type', width: 200, flex: 1, 
    renderCell: (params) => (
      <>
        {getStatusIcon(params.value)}
        {params.value}
      </>
    )
 },
  { field: 'col4', headerName: 'Format', width: 150 },
  { field: 'col5', headerName: 'Date', width: 150, flex: 1,
    renderCell: (params) => (
      <>
        <CalendarIcon style={{ verticalAlign: 'middle', marginRight: 8}} />
        {params.value}
      </>
    )
   },
]; 

const getStatusIcon = (status) => {
  switch (status) {
    case 'Offer':
      return <CelebrationIcon style={{ color: 'gold', marginRight: 8 }} />;
    default:
      return null;
  }
};

const getTitleIcon = (title) => {
  switch (title) {
    case 'Software Developer':
      return <DeveloperModeIcon style={{ color: 'blue', marginRight: 8 }} />;
    case 'Computer Engineer':
      return <ComputerIcon style={{ color: 'blue', marginRight: 8 }} />;
    case 'Product Manager':
      return <BusinessCenterIcon style={{ color: 'green', marginRight: 8 }} />;
    case 'Machine Learning Engineer':
      return <FunctionsIcon style={{ color: 'purple', marginRight: 8 }} />;
    case 'Data Scientist':
      return <InsightsIcon style={{ color: 'teal', marginRight: 8 }} />;
    case 'Devops':
      return <CloudIcon style={{ color: 'orange', marginRight: 8 }} />;
    case 'AI Developer':
      return <SmartToyIcon style={{ color: 'red', marginRight: 8 }} />;
    case 'CyberSecurity':
      return <SecurityIcon style={{ color: 'black', marginRight: 8 }} />;
    case 'Full Stack':
      return <LayersIcon style={{ color: 'cyan', marginRight: 8 }} />;
    case 'WebDev':
      return <LanguageIcon style={{ color: 'blue', marginRight: 8 }} />;
    case 'UX Designer':
      return <DesignServicesIcon style={{ color: 'pink', marginRight: 8 }} />;
    default:
      return null;
  }
};

const Responses = () => {
  return (
    <div className="container mx-auto p-8" >
      <h1 style={h1Style}> Response Tracker </h1>
      <h2 style={h2Style}> Manage all your response information below!</h2>
      {/* You can include your resume management functionality here */}
      <DataGrid rows={rows} columns={columns}
      sx={{
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: 'rgba(235, 235, 235, 0.7)',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 'bold', // Apply bold font weight to all column headers
        },
        '& .MuiDataGrid-cell': {
          borderRight: '1px solid rgba(224, 224, 224, 1)'
        }
      }} />
    </div>

  );
};



export default Responses;
