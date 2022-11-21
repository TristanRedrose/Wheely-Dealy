import React from 'react';
import "./LoadingCircle.css"

const LoadingCircle: React.FC = () => {
    return (
        <div>
            <div className="center">
                <span className="loading-text">Loading...</span>
                <div className="ring" />
            </div>
        </div>
    )
}

export default LoadingCircle;