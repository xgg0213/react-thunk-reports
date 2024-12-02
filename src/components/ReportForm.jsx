import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadReport, updateAReport } from '../store/reports';
import { useDispatch } from 'react-redux';


const ReportForm = ({ report, formType }) => {
  const navigate = useNavigate();
  const [understanding, setUnderstanding] = useState(report?.understanding);
  const [improvement, setImprovement] = useState(report?.improvement);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  
  const validateForm = () => {
    const validationErrors = {};
    if (!understanding || understanding.trim() === '') {
      validationErrors.understanding = 'Understanding is required.';
    }
    if (!improvement || improvement.trim() === '') {
      validationErrors.improvement = 'Improvement is required.';
    }
    return validationErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors({});

    // Validate inputs
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    report = { ...report, understanding, improvement };
    
    if (formType === 'Create Report') {
      const createdReport = await dispatch(uploadReport(report));
    
      navigate(`/reports/${createdReport.id}`)
    }
    
    if (formType === 'Update Report') {
      const updatedReport = await dispatch(updateAReport(report.id, {understanding: report.understanding, improvement: report.improvement}));
    
      navigate(`/reports/${updatedReport.id}`)
    }
  };

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <form onSubmit={handleSubmit}>
      <h2>{formType}</h2>
      <div className="errors">{errors.understanding}</div>
      <label>
        Understanding:
        <input
          type="text"
          value={understanding}
          onChange={(e) => setUnderstanding(e.target.value)}
        />
      </label>
      <div className="errors">{errors.improvement}</div>
      <label>
        Improvement:
        <textarea
          value={improvement}
          onChange={(e) => setImprovement(e.target.value)}
        />
      </label>
      <button type="submit">{formType}</button>
    </form>
  );
};

export default ReportForm;
