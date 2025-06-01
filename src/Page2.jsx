// Page2.jsx
import React from 'react';
import './FormWrapper.css';

const Page2 = ({ formData, handleChange }) => {
  const rows = Array.from({ length: 30 }, (_, i) => i + 1);

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
    </div>
  );
};

export default Page2;
