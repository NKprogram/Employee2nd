'use client';
import React, { useState, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ConstructionIcon from "@mui/icons-material/Construction";
import CancelIcon from "@mui/icons-material/Cancel";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import PeopleIcon from "@mui/icons-material/People";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import ComputerIcon from "@mui/icons-material/Computer";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import FunctionsIcon from "@mui/icons-material/Functions";
import InsightsIcon from "@mui/icons-material/Insights";
import CloudIcon from "@mui/icons-material/Cloud";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SecurityIcon from "@mui/icons-material/Security";
import LayersIcon from "@mui/icons-material/Layers";
import LanguageIcon from "@mui/icons-material/Language";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

const Tracker = () => {
  const [applications, setApplications] = useState([]);
  const [open, setOpen] = useState(false);
  const [newApp, setNewApp] = useState({
    title: "",
    company: "",
    status: "",
    minPay: "",
    maxPay: "",
    location: "",
    date: "",
  });

  // Fetch applications from MongoDB on component mount
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("/api/getApplication");
      if (response.data.success) {
        setApplications(response.data.data); // Set the applications data
      } else {
        console.error("Failed to fetch applications");
      }
    } catch (error) {
      console.error("Error fetching applications", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewApp({ ...newApp, [e.target.name]: e.target.value });
  };

  const addApplication = async () => {
    try {
      await axios.post("/api/addApplication", newApp); // POST the form data to MongoDB
      fetchApplications(); // Fetch the updated list of applications
      handleClose();
      setNewApp({ title: "", company: "", status: "", minPay: "", maxPay: "", location: "", date: "" });
    } catch (error) {
      console.error("Error adding application", error);
    }
  };

  const deleteApplication = async (id) => {
    try {
      const response = await axios.delete(`/api/deleteApplication/${id}`);
      if (response.data.success) {
        fetchApplications(); // Fetch the updated list of applications
      } else {
        console.error("Failed to delete application");
      }
    } catch (error) {
      console.error("Error deleting application", error);
    }
  };

  const buttonStyle = {
    display: 'block',
    marginBottom: 16,
    marginTop: 20,
    backgroundColor: '#000000', // Black color
    color: '#fff', // White text color
    '&:hover': {
      backgroundColor: '#115293', // Darker blue on hover
    },
  };

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "Applied":
        return <CheckCircleIcon style={{ color: "green", marginRight: 8 }} />;
      case "In Progress":
        return <ConstructionIcon style={{ color: "orange", marginRight: 8 }} />;
      case "Rejected":
        return <CancelIcon style={{ color: "red", marginRight: 8 }} />;
      case "Upcoming":
        return <UpcomingIcon style={{ color: "blue", marginRight: 8 }} />;
      case "Interview":
        return <PeopleIcon style={{ color: "grey", marginRight: 8 }} />;
      default:
        return null;
    }
  };

  const getTitleIcon = (title) => {
    switch (title) {
      case "Software Developer":
        return <DeveloperModeIcon style={{ color: "blue", marginRight: 8 }} />;
      case "Computer Engineer":
        return <ComputerIcon style={{ color: "blue", marginRight: 8 }} />;
      case "Product Manager":
        return <BusinessCenterIcon style={{ color: "green", marginRight: 8 }} />;
      case "Machine Learning Engineer":
        return <FunctionsIcon style={{ color: "purple", marginRight: 8 }} />;
      case "Data Scientist":
        return <InsightsIcon style={{ color: "teal", marginRight: 8 }} />;
      case "Devops":
        return <CloudIcon style={{ color: "orange", marginRight: 8 }} />;
      case "AI Developer":
        return <SmartToyIcon style={{ color: "red", marginRight: 8 }} />;
      case "CyberSecurity":
        return <SecurityIcon style={{ color: "black", marginRight: 8 }} />;
      case "Full Stack":
        return <LayersIcon style={{ color: "cyan", marginRight: 8 }} />;
      case "WebDev":
        return <LanguageIcon style={{ color: "blue", marginRight: 8 }} />;
      case "UX Designer":
        return <DesignServicesIcon style={{ color: "pink", marginRight: 8 }} />;
      default:
        return null;
    }
  };

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      flex: 1.25,
      renderCell: (params) => (
        <>
          {getTitleIcon(params.value)}
          {params.value}
        </>
      ),
    },
    { field: 'company', headerName: 'Company Name', width: 200, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
      flex: 1,
      renderCell: (params) => (
        <>
          {getStatusIcon(params.value)}
          {params.value}
        </>
      ),
    },
    { field: 'minPay', headerName: 'Min Pay', type: 'number', align: 'left', headerAlign: 'left', flex: 1, renderCell: (params) => `$ ${params.value.toLocaleString()}` },
    { field: 'maxPay', headerName: 'Max Pay', type: 'number', align: 'left', headerAlign: 'left', flex: 1, renderCell: (params) => `$ ${params.value.toLocaleString()}` },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'date', headerName: 'Date Applied', flex: 1 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Delete"
          onClick={() => deleteApplication(params.id)}
        />
      ),
    },
  ];

  return (
    <div style={{ height: '100%', width: '100%', paddingLeft: 80, paddingRight: 25, paddingTop: 25 }}>
      <h1 style={h1Style}>Application Tracker</h1>
      <h2 style={h2Style}>Organize all your application history and information below!</h2>
      <Button style={buttonStyle} onClick={handleOpen}>Add New Application</Button>
      <DataGrid
        rows={applications}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row._id}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(235, 235, 235, 0.7)',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-cell': {
            borderRight: '1px solid rgba(224, 224, 224, 1)'
          }
        }}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Application</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="title-label">Title</InputLabel>
            <Select
              labelId="title-label"
              id="title-select"
              name="title"
              value={newApp.title}
              label="Title"
              onChange={handleChange}
            >
              <MenuItem value="Software Developer"><DeveloperModeIcon style={{ color: "blue" }} /> Software Developer</MenuItem>
              <MenuItem value="Computer Engineer"><ComputerIcon style={{ color: "blue" }} /> Computer Engineer</MenuItem>
              <MenuItem value="Product Manager"><BusinessCenterIcon style={{ color: "green" }} /> Product Manager</MenuItem>
              <MenuItem value="Machine Learning Engineer"><FunctionsIcon style={{ color: "purple" }} /> Machine Learning Engineer</MenuItem>
              <MenuItem value="Data Scientist"><InsightsIcon style={{ color: "teal" }} /> Data Scientist</MenuItem>
              <MenuItem value="Devops"><CloudIcon style={{ color: "orange" }} /> DevOps</MenuItem>
              <MenuItem value="AI Developer"><SmartToyIcon style={{ color: "red" }} /> AI Developer</MenuItem>
              <MenuItem value="CyberSecurity"><SecurityIcon style={{ color: "black" }} /> CyberSecurity</MenuItem>
              <MenuItem value="Full Stack"><LayersIcon style={{ color: "cyan" }} /> Full Stack Developer</MenuItem>
              <MenuItem value="WebDev"><LanguageIcon style={{ color: "blue" }} /> Web Developer</MenuItem>
              <MenuItem value="UX Designer"><DesignServicesIcon style={{ color: "pink" }} /> UX Designer</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="company"
            label="Company Name"
            fullWidth
            variant="standard"
            value={newApp.company}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status-select"
              name="status"
              value={newApp.status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="Applied"><CheckCircleIcon style={{ color: "green" }} /> Applied</MenuItem>
              <MenuItem value="In Progress"><ConstructionIcon style={{ color: "orange" }} /> In Progress</MenuItem>
              <MenuItem value="Rejected"><CancelIcon style={{ color: "red" }} /> Rejected</MenuItem>
              <MenuItem value="Upcoming"><UpcomingIcon style={{ color: "blue" }} /> Upcoming</MenuItem>
              <MenuItem value="Interview"><PeopleIcon style={{ color: "grey" }} /> Interview</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="minPay"
            label="Min Pay"
            fullWidth
            variant="standard"
            type="number"
            value={newApp.minPay}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="maxPay"
            label="Max Pay"
            fullWidth
            variant="standard"
            type="number"
            value={newApp.maxPay}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            fullWidth
            variant="standard"
            value={newApp.location}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="date"
            label="Date Applied"
            type="date"
            fullWidth
            variant="standard"
            value={newApp.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addApplication}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Tracker;
