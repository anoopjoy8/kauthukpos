import React, { useState } from 'react';

const LoadMoreButton = (props) => {
  const [isLoading, setIsLoading] = useState(props.isLoading);
  return (
    <div className="d-flex justify-content-center mt-3">
      <button
        type="button"
        className="btn btn-primary"
        onClick={props.onClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-xs text-light me-2" role="status"
            style={{ width: '15px', height: '15px', borderWidth: '2px' }}>
            </span>
            Loading...
          </>
        ) : (
          <>
            <i className="mdi mdi-reload btn-icon-prepend me-1"
            style={{ width: '15px', height: '15px', borderWidth: '2px' }}
            ></i> Load More
          </>
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton;