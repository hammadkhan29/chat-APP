// LoadingSpinner.js
import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="primary" role="status">
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;
