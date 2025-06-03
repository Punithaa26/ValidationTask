import React, { useState } from "react";
import "./ClientForm.css";
import tc from "./t&c.pdf";

const ClientForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
    mobile: "",
    timeline: "",
    projectName: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        
        const errors = {};
        result.errors.forEach(err => {
          errors[err.path] = err.msg;
        });
        setFieldErrors(errors);
        setMessage(""); 
        return;
      }

      
      setMessageColor("green");
      setMessage(result.message);
      setFormData({
        companyName: "",
        name: "",
        email: "",
        mobile: "",
        timeline: "",
        projectName: "",
        description: "",
      });
    } catch (err) {
      setMessageColor("red");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mt-3 pt-2 mb-3" id="clientform">
      <div className="justify-content-center">
        <div className="mt-2 pt-2 mb-2">
          <div className="formHeadTitle mt-3">Welcome back 👋</div>
          <div className="formHeadTagline mt-2">
            Fill the required details to move forward...
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-2 mb-2 pt-2 w-75">

        
          <div className="pt-2">
            <label className="form-label" id="formLabel">Company Name *</label>
            <input
              type="text"
              name="companyName"
              className="formControl"
              placeholder="Enter your Company name"
              id="input"
              value={formData.companyName}
              onChange={handleChange}
            />
            {fieldErrors.companyName && <div style={{ color: "red" }}>{fieldErrors.companyName}</div>}
          </div>

          
          <div className="pt-3">
            <label className="form-label" id="formLabel">Name *</label>
            <input
              type="text"
              name="name"
              className="formControl"
              placeholder="Enter your Name"
              id="input"
              value={formData.name}
              onChange={handleChange}
            />
            {fieldErrors.name && <div style={{ color: "red" }}>{fieldErrors.name}</div>}
          </div>

          
          <div className="pt-3">
            <label className="form-label" id="formLabel">Email address *</label>
            <input
              type="text"
              name="email"
              className="formControl"
              placeholder="Enter Gmail"
              id="input"
              value={formData.email}
              onChange={handleChange}
            />
            {fieldErrors.email && <div style={{ color: "red" }}>{fieldErrors.email}</div>}
          </div>

          
          <div className="pt-3">
            <label className="form-label" id="formLabel">Mobile Number *</label>
            <input
              type="text"
              name="mobile"
              className="formControl"
              placeholder="Enter 10-digit mobile"
              id="input"
              value={formData.mobile}
              onChange={handleChange}
            />
            {fieldErrors.mobile && <div style={{ color: "red" }}>{fieldErrors.mobile}</div>}
          </div>

          
          <div className="pt-3">
            <label className="form-label" id="formLabel">Estimated Timeline *</label>
            <input
              type="text"
              name="timeline"
              className="formControl"
              placeholder="Enter timeline"
              id="input"
              value={formData.timeline}
              onChange={handleChange}
            />
            {fieldErrors.timeline && <div style={{ color: "red" }}>{fieldErrors.timeline}</div>}
          </div>

          
          <div className="pt-3">
            <label className="form-label" id="formLabel">Project Name *</label>
            <input
              type="text"
              name="projectName"
              className="formControl"
              placeholder="Enter project name"
              id="input"
              value={formData.projectName}
              onChange={handleChange}
            />
            {fieldErrors.projectName && <div style={{ color: "red" }}>{fieldErrors.projectName}</div>}
          </div>

          
          <div className="pt-3">
            <label className="form-label" id="formLabel">Project Description *</label>
            <textarea
              name="description"
              className="formControl"
              placeholder="Describe your project"
              id="textarea"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            {fieldErrors.description && <div style={{ color: "red" }}>{fieldErrors.description}</div>}
          </div>

          
          <div className="pt-3">
            <label className="form-label" id="formLabel">Budget *</label>
            <input
              type="text"
              className="formControl"
              placeholder="₹ 8,000.00"
              id="budgetinput"
              disabled
            />
          </div>

          
          <div className="form-check pt-3">
            <input className="form-check-input" type="checkbox" id="input" defaultChecked />
            <label className="form-check-label" htmlFor="flexCheck">
              I agree to all{" "}
              <a href={tc} id="tc" download="t&c.pdf">Terms & Conditions</a>
            </label>
          </div>

          
          <button type="submit" className="button mt-5 w-100">Submit</button>

          
          {message && (
            <div className="mt-3" style={{ color: messageColor, textAlign: "left", fontSize: "1.1rem" }}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ClientForm;