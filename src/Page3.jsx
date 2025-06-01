// Page3.jsx
import React from 'react';
import './FormWrapper.css';

const Page3 = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <h2>Performance Summary</h2>

      <label>Total Runtime *</label>
      <input type="text" name="totalRuntime" value={formData.totalRuntime} onChange={handleChange} required />

      <label>Total Downtime *</label>
      <input type="text" name="totalDowntime" value={formData.totalDowntime} onChange={handleChange} required />

      <label>OEE *</label>
      <input type="text" name="oee" value={formData.oee} onChange={handleChange} required />

      <label>Availability Rate *</label>
      <input type="text" name="availabilityRate" value={formData.availabilityRate} onChange={handleChange} required />

      <label>Performance Rate *</label>
      <input type="text" name="performanceRate" value={formData.performanceRate} onChange={handleChange} required />

      <label>Quality Rate *</label>
      <input type="text" name="qualityRate" value={formData.qualityRate} onChange={handleChange} required />

      <label>Total Counter Reading *</label>
      <input type="text" name="totalCounterReading" value={formData.totalCounterReading} onChange={handleChange} required />

      <label>IMA Reel Waste *</label>
      <input type="text" name="imaReelWaste" value={formData.imaReelWaste} onChange={handleChange} required />

      <label>IMA Rejected Reel</label>
      <input type="text" name="imaRejectedReel" value={formData.imaRejectedReel} onChange={handleChange} />

      <label>Operator *</label>
      <div className="row">
        <input type="text" name="operatorFirstName" placeholder="First Name" value={formData.operatorFirstName} onChange={handleChange} required />
        <input type="text" name="operatorLastName" placeholder="Last Name" value={formData.operatorLastName} onChange={handleChange} required />
      </div>

      <label>Incoming Operator *</label>
      <div className="row">
        <input type="text" name="incomingFirstName" placeholder="First Name" value={formData.incomingFirstName} onChange={handleChange} required />
        <input type="text" name="incomingLastName" placeholder="Last Name" value={formData.incomingLastName} onChange={handleChange} required />
      </div>

      <div className="buttons">
        <button type="button">Save</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Page3;
