import { useNavigate, useParams } from 'react-router-dom';
import ReportForm from './ReportForm';
import { updateAReport, getReport } from '../store/reports';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const EditReportForm = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reportFromStore = useSelector((state) => state.reports[reportId]);
  const [report, setReport] = useState(reportFromStore || {});
  const [understanding, setUnderstanding] = useState(report?.understanding);
  const [improvement, setImprovement] = useState(report?.improvement);
  const [errors, setErrors] = useState({});
  // const report = {}; // populate from Redux store
  
  useEffect(() => {
    if (!reportFromStore) {
      // Optional: Fetch report if not already in the store
      dispatch(getReport(reportId)); // Uncomment if needed
    } else {
      setReport(reportFromStore);
    }
  }, [dispatch, reportId, reportFromStore]);

  // const validateForm = () => {
  //   const validationErrors = {};
  //   if (!understanding || understanding.trim() === '') {
  //     validationErrors.understanding = 'Understanding is required.';
  //   }
  //   if (!improvement || improvement.trim() === '') {
  //     validationErrors.improvement = 'Improvement is required.';
  //   }
  //   return validationErrors;
  // };

  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   setErrors({});

  //   // Validate inputs
  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }
    
  //   // report = { ...report, understanding, improvement };
    
  //   const updatedReport = await dispatch(updateAReport(reportId));
    
  //   navigate(`/reports/${updatedReport.id}`)
    
  // };
    
  

  if (!report) return(<></>);

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    Object.keys(report).length > 1 && (
      <>
        <ReportForm
          report={report}
          formType="Update Report"
        />
      </>
    )
  );
};

export default EditReportForm;

