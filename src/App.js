// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Page1 from './Page1.jsx';
import Page2 from './Page2.jsx';
import Page3 from './Page3.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import axios from 'axios';
import Spinner from './Spinner.jsx'; // You must have a spinner component (see below)

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    date: '',
    factory: '',
    machineNumber: '',
    productType: '',
    shift: '',
    totalRuntime: '',
    totalDowntime: '',
    oee: '',
    availabilityRate: '',
    performanceRate: '',
    qualityRate: '',
    totalCounterReading: '',
    imaReelWaste: '',
    imaRejectedReel: '',
    operatorFirstName: '',
    operatorLastName: '',
    incomingFirstName: '',
    incomingLastName: '',
    hourlyReadings: [],
    issues: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHourlyReadingsChange = (index, e) => {
    const updatedReadings = [...formData.hourlyReadings];
    updatedReadings[index][e.target.name] = e.target.value;
    setFormData({ ...formData, hourlyReadings: updatedReadings });
  };

  const addHourlyReadingRow = () => {
    setFormData((prev) => ({
      ...prev,
      hourlyReadings: [
        ...prev.hourlyReadings,
        {
          time: '',
          machineCounter: '',
          runtime: '',
          speed: '',
          avgWeightBefore: '',
          avgWeightAfter: '',
        },
      ],
    }));
  };

  const handleIssuesChange = (index, e) => {
    const updatedIssues = [...formData.issues];
    updatedIssues[index][e.target.name] = e.target.value;
    setFormData({ ...formData, issues: updatedIssues });
  };

  const addIssueRow = () => {
    setFormData((prev) => ({
      ...prev,
      issues: [
        ...prev.issues,
        {
          description: '',
          whatWasDone: '',
          startTime: '',
          endTime: '',
          totalDowntime: '',
          repairRequired: '',
          comment: '',
          technician: '',
        },
      ],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}/submit`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Report submitted successfully!');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (path) => {
    navigate(path);
  };

  return (
    <>
      {loading && <Spinner />}
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated() ? '/page1' : '/login'} />} />
        <Route
          path="/page1"
          element={
            <PrivateRoute>
              <Page1
                formData={formData}
                handleChange={handleChange}
                goNext={() => goToPage('/page2')}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/page2"
          element={
            <PrivateRoute>
              <Page2
                formData={formData}
                handleChange={handleChange}
                goNext={() => goToPage('/page3')}
                goBack={() => goToPage('/page1')}
                hourlyReadings={formData.hourlyReadings}
                handleHourlyReadingsChange={handleHourlyReadingsChange}
                addHourlyReadingRow={addHourlyReadingRow}
                issues={formData.issues}
                handleIssuesChange={handleIssuesChange}
                addIssueRow={addIssueRow}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/page3"
          element={
            <PrivateRoute>
              <Page3
                formData={formData}
                handleChange={handleChange}
                goBack={() => goToPage('/page2')}
                handleSubmit={handleSubmit}
                setLoading={setLoading}
              />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login goToRegister={() => goToPage('/register')} onLoginSuccess={() => goToPage('/page1')} />} />
        <Route path="/register" element={<Register goToLogin={() => goToPage('/login')} />} />
      </Routes>
    </>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
