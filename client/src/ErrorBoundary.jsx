import React, { useState } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const componentDidCatch = (error, errorInfo) => {
    setHasError(true);
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  };

  if (hasError) {
    // You can render any custom fallback UI
    return <div>Something went wrong!</div>;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default ErrorBoundary;
