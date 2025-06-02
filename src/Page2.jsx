import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FormWrapper.css';

const Page2 = ({ formData, handleChange }) => {
  const navigate = useNavigate();
  const rows = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleNext = () => {
    navigate('/page3');
  };

  const handleBack = () => {
    navigate('/page1');
  };

  return (
    <div className="form-wrapper">
      <h2>Issues</h2>
      <table className="table-grid">
        <thead>
          <tr>
            <th>#</th>
            <th>Description Of Issues</th>
            <th>What Was Done</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Total Downtime</th>
            <th>Further Repair Required (Yes/No)</th>
            <th>Comment</th>
            <th>Technician Name</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((i) => (
            <tr key={i}>
              <td>{i}</td>
              {[...Array(8)].map((_, col) => (
                <td key={col}>
                  <input type="text" name={`page2-row-${i}-col-${col}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Navigation Buttons */}
      <div className="navigation-controls" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handleBack}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
        >
          ← Back
        </button>

        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Page2;
