import React from 'react';
import './ErrorPage.css';

function NotFound() {
  return (
    <div className="error-container">
      <div className="rail">
        {[...Array(10)].map((_, i) => (
          <React.Fragment key={i}>
            <div className="stamp four"></div>
            <div className="stamp zero"></div>
          </React.Fragment>
        ))}
      </div>
      <div className="world">
        <div className="forward">
          <div className="box">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="wall"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;