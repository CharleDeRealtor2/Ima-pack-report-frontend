import React, { useState } from 'react';
import './FormWrapper.css';
import Spinner from './components/Spinner.jsx';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Page3 = ({ formData, handleChange, handleSubmit, goBack, setLoading }) => {
  const [downloading, setDownloading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit();
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const downloadFile = async (type) => {
    const token = localStorage.getItem('token');
    const url = `${API_BASE_URL}/export/${type}`;
    setDownloading(true);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `IMA_Pack_Report.${type === 'pdf' ? 'pdf' : 'xlsx'}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      alert('Failed to download file. Please try again.');
      console.error(error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      {(downloading) && <Spinner />}

      <form className="form-wrapper" onSubmit={onSubmit}>
        <h2>Performance Summary</h2>

        <label>Total Runtime *</label>
        <input
          type="text"
          name="totalRuntime"
          value={formData.totalRuntime}
          onChange={handleChange}
          required
        />

        <label>Total Downtime *</label>
        <input
          type="text"
          name="totalDowntime"
          value={formData.totalDowntime}
          onChange={handleChange}
          required
        />

        <label>OEE *</label>
        <input
          type="text"
          name="oee"
          value={formData.oee}
          onChange={handleChange}
          required
        />

        <label>Availability Rate *</label>
        <input
          type="text"
          name="availabilityRate"
          value={formData.availabilityRate}
          onChange={handleChange}
          required
        />

        <label>Performance Rate *</label>
        <input
          type="text"
          name="performanceRate"
          value={formData.performanceRate}
          onChange={handleChange}
          required
        />

        <label>Quality Rate *</label>
        <input
          type="text"
          name="qualityRate"
          value={formData.qualityRate}
          onChange={handleChange}
          required
        />

        <label>Total Counter Reading *</label>
        <input
          type="text"
          name="totalCounterReading"
          value={formData.totalCounterReading}
          onChange={handleChange}
          required
        />

        <label>IMA Reel Waste *</label>
        <input
          type="text"
          name="imaReelWaste"
          value={formData.imaReelWaste}
          onChange={handleChange}
          required
        />

        <label>IMA Rejected Reel</label>
        <input
          type="text"
          name="imaRejectedReel"
          value={formData.imaRejectedReel}
          onChange={handleChange}
        />

        <label>Operator *</label>
        <div className="row">
          <input
            type="text"
            name="operatorFirstName"
            placeholder="First Name"
            value={formData.operatorFirstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="operatorLastName"
            placeholder="Last Name"
            value={formData.operatorLastName}
            onChange={handleChange}
            required
          />
        </div>

        <label>Incoming Operator *</label>
        <div className="row">
          <input
            type="text"
            name="incomingFirstName"
            placeholder="First Name"
            value={formData.incomingFirstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="incomingLastName"
            placeholder="Last Name"
            value={formData.incomingLastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="buttons">
          <button type="button" onClick={goBack}>Back</button>
          <button type="submit">Submit</button>
        </div>
      </form>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h3>Download Report</h3>
        <button onClick={() => downloadFile('pdf')} style={styles.button}>Download PDF</button>
        <button onClick={() => downloadFile('excel')} style={styles.button}>Download Excel</button>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button onClick={logout} style={styles.logoutButton}>Logout</button>
      </div>
    </>
  );
};

const styles = {
  button: {
    margin: '0.5rem',
    padding: '0.6rem 1.5rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: '1.5rem',
    padding: '0.6rem 2rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Page3;
