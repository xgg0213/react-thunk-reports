import { Link } from 'react-router-dom';
import ReportIndexItem from './ReportIndexItem';
import { resetDatabase } from '../mocks/storage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReports } from '../store/reports';
import { selectAllReports } from '../store/reports';

const ReportsIndex = () => {
  // const reports = []; // populate from Redux store

  const dispatch = useDispatch();
  //const reportsObj = useSelector((state) => state.reports? state.reports: {}); // Access reports from the Redux store
  const reportsObj = useSelector(selectAllReports);

  useEffect(() => {
    dispatch(fetchReports()); // Fetch reports on component mount
  }, [dispatch]);

  //const reports = Object.values(reportsObj)
  const reports = reportsObj;

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <section>
      <ul>
        {reports.map((report) => (
          <ReportIndexItem
            report={report}
            key={report.id}
          />
        ))}
      </ul>
      <Link
        className="back-button new"
        to="/reports/new"
      >
        New Report
      </Link>
      <button onClick={resetDatabase}>Reset the Database</button>
    </section>
  );
};

export default ReportsIndex;
