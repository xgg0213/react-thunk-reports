import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteReport } from '../store/reports';

const ReportIndexItem = ({ report }) => {
  const dispatch=useDispatch();
  
  const handleDelete = (e) => {
    e.preventDefault();
    if (report?.id) {
      dispatch(deleteReport(report.id)); // Pass the report ID to the thunk
      
    } else {
      console.error('Report ID is undefined');
    }
  };

  if (!report || !report.id) {
    console.error('Invalid report:', report); // Log invalid report for debugging
    return null; // Do not render if the report or ID is invalid
  }
  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    
    <li>
      <div className="li-contents-flex">
        <Link to={`/reports/${report.id}`}>Report #{report.id}</Link>
        <div className="buttons-container">
          <Link
            className="edit-link"
            to={`/reports/${report.id}/edit`}
          >
            Edit
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </li>
  );
};

export default ReportIndexItem;
