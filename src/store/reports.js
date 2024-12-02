import { useParams } from "react-router-dom";
import { createSelector } from "reselect";

/** Action Type Constants: */
export const LOAD_REPORTS = 'reports/LOAD_REPORTS';
export const RECEIVE_REPORT = 'reports/RECEIVE_REPORT';
export const UPDATE_REPORT = 'reports/UPDATE_REPORT';
export const REMOVE_REPORT = 'reports/REMOVE_REPORT';

/**  Action Creators: */
export const loadReports = (reports) => ({
  type: LOAD_REPORTS,
  reports
});

export const receiveReport = (report) => ({
  type: RECEIVE_REPORT,
  report
});

export const editReport = (report) => ({
  type: UPDATE_REPORT,
  report
});

export const removeReport = (reportId) => ({
  type: REMOVE_REPORT,
  reportId
});

/** Thunk Action Creators: */

// Your code here 

/** Selectors: */
// fetch all reports
export const fetchReports = () => async (dispatch) => {
    const response = await fetch('/api/reports'); 
    const reports = await response.json();
    console.log(reports)
    dispatch(loadReports(reports)); // Dispatch the action to load reports into the store

};



// remove a report
export const deleteReport = (id) => async(dispatch) => {
  const response = await fetch(`/api/reports/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    // throw new Error('Failed to delete report');
    return (console.log("there is error with deleting report"))
  }

  dispatch(removeReport(id))
  
}

// receive a report
export const getReport = (id) => async(dispatch) => {
  const response = await fetch(`/api/reports/${id}`, {
    method: 'GET',
  })
  const data = await response.json();
  dispatch(receiveReport(data))
}

// upload a report
export const uploadReport = (payload) => async(dispatch) => {
  const response = await fetch('/api/reports', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  if (response.ok) {
    const report = await response.json();
    dispatch(receiveReport(report));
    return report;
  }

  return ('Error: there is an error creating new report')
}

// update a report
export const updateAReport = (id, {understanding, improvement}) => async(dispatch) => {
  const response = await fetch(`/api/reports/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({understanding, improvement}), // Pass the updated data here
  });
  if (response.ok) {
    const report = await response.json();
    dispatch(editReport(report));
    return report
  }

  return ('Error: there is an error updating the report')
}


// createSelectors - memoizing the reports to ensure unnecessary reload when the values stay the same
const selectReports = (state) => state.reports;
export const selectAllReports = createSelector(selectReports, (reports)=> {
  return reports? Object.values(reports): []
})



/** Reducer: */

/** The reports reducer is complete and does not need to be modified */
const reportsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REPORTS: {
      const reportsState = {};
      action.reports.forEach((report) => {
        reportsState[report.id] = report;
      });
      return reportsState;
    }

    // what Philip suggested - did not change much of the results
    // case RECEIVE_REPORT: {
    //   const newState = structuredClone(state);
    //   newState[action.report.id] = action.report;
    //   return newState
    //   // return { ...state, [action.report.id]: action.report }; 
    // }
    case RECEIVE_REPORT: 
      return { ...state, [action.report.id]: action.report }; 
      // if the id already exists, the id content is automatically updated - an object cannot have duplicate keys
      // this smae receive_report can handle both fetch a single report && upload a new one
    case UPDATE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case REMOVE_REPORT: {
      const newState = { ...state };
      delete newState[action.reportId];
      return newState;
    }
    default:
      return state;
  }
};

export default reportsReducer;
