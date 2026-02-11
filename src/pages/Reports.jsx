import React, { useState, useEffect } from 'react';
import { DocumentTextIcon, ArrowDownTrayIcon, CalendarIcon } from '@heroicons/react/24/outline';
import dataService from '../services/dataService';

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports(dataService.getReports());
  }, []);

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold mb-1">Reports</h1>
          <p className="text-muted mb-0">Download and view your business reports</p>
        </div>
        <button className="btn btn-primary">
          <DocumentTextIcon style={{width: '20px', height: '20px'}} className="me-2" />
          Generate Report
        </button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted small mb-1">Total Reports</h6>
              <h3 className="fw-bold mb-0">{reports.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted small mb-1">This Month</h6>
              <h3 className="fw-bold mb-0">12</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted small mb-1">Processing</h6>
              <h3 className="fw-bold mb-0">1</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted small mb-1">Total Size</h6>
              <h3 className="fw-bold mb-0">13 MB</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>Data Preview</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <DocumentTextIcon style={{width: '20px', height: '20px'}} className="text-primary me-2" />
                        <span className="fw-medium">{report.name}</span>
                      </div>
                    </td>
                    <td><span className="badge bg-info">{report.type}</span></td>
                    <td>
                      <CalendarIcon style={{width: '16px', height: '16px'}} className="me-1" />
                      {report.date}
                    </td>
                    <td>{report.size}</td>
                    <td>
                      <span className={`badge ${report.status === 'Ready' ? 'bg-success' : 'bg-warning'}`}>
                        {report.status}
                      </span>
                    </td>
                    <td>
                      <small className="text-muted">
                        {report.data && Object.entries(report.data).slice(0, 2).map(([key, val]) => (
                          <div key={key}>{key}: {val}</div>
                        ))}
                      </small>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary">
                        <ArrowDownTrayIcon style={{width: '16px', height: '16px'}} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
