import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { deleteDownloadHistoryAPI, getDownloadHistoryAPI } from '../services/allAPI';

function History() {
  const [resume, setResume] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch history from backend
  const getHistory = async () => {
    try {
      setLoading(true);
      const result = await getDownloadHistoryAPI();
      console.log('History fetched:', result);
      
      if (result && result.data) {
        setResume(result.data);
      }
    } catch (err) {
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIX: Remove 'resume' from dependency array
  // Only run once when component mounts
  useEffect(() => {
    getHistory();
  }, []); // Empty array = run only once on mount

  // Handle delete
  const handleRemove = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteDownloadHistoryAPI(id);
        console.log('Resume deleted:', id);
        // Refresh the list after deletion
        getHistory();
      } catch (err) {
        console.error('Error deleting resume:', err);
        alert('Failed to delete resume. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1 className='text-center mt-5'>Downloaded Resume History</h1>
      <Link to={'/'} style={{ marginTop: '-50px' }} className='float-end me-5'>
        BACK
      </Link>

      <Box component='section' className='container-fluid'>
        {loading ? (
          <div className="text-center mt-5">
            <p>Loading history...</p>
          </div>
        ) : (
          <div className="row">
            {resume?.length > 0 ? (
              resume.map((item, index) => (
                <div className="col-md-4" key={item?.id || index}>
                  <Paper elevation={3} sx={{ my: 5, p: 3, textAlign: 'center' }}>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div>
                        <h6 className="mb-1">Downloaded At:</h6>
                        <small className="text-muted">
                          {item?.timeStamp || 'No timestamp available'}
                        </small>
                      </div>
                      <button
                        onClick={() => handleRemove(item?.id)}
                        className='btn text-danger fs-4'
                        title="Delete Resume"
                      >
                        <MdDelete />
                      </button>
                    </div>

                    <div className="border rounded p-3 bg-light">
                      {item?.imgURL || item?.imgUrl ? (
                        <img
                          className='img-fluid'
                          src={item?.imgURL || item?.imgUrl}
                          alt="resume preview"
                          style={{ maxHeight: '400px', objectFit: 'contain' }}
                        />
                      ) : (
                        <p className="text-muted">No preview available</p>
                      )}
                    </div>

                    {/* Optional: Show resume owner name */}
                    {item?.personalDetails?.name && (
                      <div className="mt-3">
                        <strong>{item.personalDetails.name}</strong>
                        {item?.personalDetails?.jobTitle && (
                          <p className="text-muted small mb-0">
                            {item.personalDetails.jobTitle}
                          </p>
                        )}
                      </div>
                    )}
                  </Paper>
                </div>
              ))
            ) : (
              <div className="col-12 text-center mt-5">
                <p className="text-muted">No download history yet</p>
                <Link to="/resume-generator" className="btn btn-primary mt-3">
                  Create Your First Resume
                </Link>
              </div>
            )}
          </div>
        )}
      </Box>
    </div>
  );
}

export default History;