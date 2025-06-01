// Page1.jsx
import React from 'react';
import './FormWrapper.css';

const Page1 = ({ formData, handleChange }) => {
  const timeSlots = [
    "7:00 - 8:00", "8:00 - 9:00", "9:00 - 10:00", "10:00 - 11:00",
    "11:00 - 12:00", "12:00 - 1:00", "1:00 - 2:00", "2:00 - 3:00",
    "3:00 - 4:00", "4:00 - 5:00", "5:00 - 6:00", "6:00 - 7:00",
  ];

  return (
    <div className="form-wrapper">
      <h1>PROMASIDOR NIGERIA LIMITED</h1>
      <h2>IMA PACK REPORT</h2>
      <p className="doc-no">Document No : PNG-FSMS-ONGAPRD-FRM-02</p>

      <label>Date *</label>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />

      <label>Factory *</label>
      <select name="factory" value={formData.factory} onChange={handleChange} required>
        <option value="">Please Select</option>
        <option value="Onga 1">Onga 1</option>
        <option value="Onga 2">Onga 2</option>
        <option value="Onga 3">Onga 3</option>
        <option value="Onga 4">Onga 4</option>
        <option value="Onga 5">Onga 5</option>
      </select>

      <label>Machine Number *</label>
      <input type="text" name="machineNumber" value={formData.machineNumber} onChange={handleChange} required />

      <label>Product Type *</label>
      <select name="productType" value={formData.productType} onChange={handleChange} required>
        <option value="">Please Select</option>
        <option value="Beef">Beef</option>
        <option value="Chicken">Chicken</option>
      </select>

      <label>Shift *</label>
      <select name="shift" value={formData.shift} onChange={handleChange} required>
        <option value="">Please Select</option>
        <option value="Day A">Day A</option>
        <option value="Day B">Day B</option>
        <option value="Night A">Night A</option>
        <option value="Night B">Night B</option>
      </select>

      <h3>Machine Hourly Reading, Machine Speed and Cube Weight (Hourly) *</h3>
      <table className="table-grid">
        <thead>
          <tr>
            <th>Time</th>
            <th>Machine Counter</th>
            <th>Runtime (Minutes)</th>
            <th>Machine Speed</th>
            <th>Average Weight Before</th>
            <th>Average Weight After</th>
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, index) => (
            <tr key={index}>
              <td>{slot}</td>
              {[...Array(5)].map((_, col) => (
                <td key={col}>
                  <input type="text" name={`page1-row-${index}-col-${col}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page1;
