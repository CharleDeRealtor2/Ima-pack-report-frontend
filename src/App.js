// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Page1 from './Page1.jsx';
import Page2 from './Page2.jsx';
import Page3 from './Page3.jsx';
import axios from 'axios';

const App = () => {
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
    try {
      const response = await axios.post('http://localhost:5000/submit-report', formData);
      alert('Report submitted successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Submission failed.');
    }
  };

  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/page1" />} />
      <Route
        path="/page1"
        element={
          <Page1
            formData={formData}
            handleChange={handleChange}
            goNext={() => goToPage('/page2')}
          />
        }
      />
      <Route
        path="/page2"
        element={
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
        }
      />
      <Route
        path="/page3"
        element={
          <Page3
            formData={formData}
            handleChange={handleChange}
            goBack={() => goToPage('/page2')}
            handleSubmit={handleSubmit}
          />
        }
      />
    </Routes>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
