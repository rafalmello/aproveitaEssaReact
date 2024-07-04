// src/components/ProgressBar.js
import React from 'react';
import './ProgressBar.css';

export function ProgressBar(){
    const ProgressBar = ({ completed }) => {
        return (
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${completed}%` }}>
              {completed.toFixed(2)}%
            </div>
          </div>
        );
      };



}



export default ProgressBar;
