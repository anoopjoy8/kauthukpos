import React from 'react';
import { Loader2 } from 'lucide-react';
import '../../../Assets/css/loader.css'

const Loader = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;