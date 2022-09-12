import React from 'react';
import { useListingsStore } from '../../../Context/ListingsContext';
import "./LoadingCircle.css"

const LoadingCircle: React.FC = () => {

    const {isLoading} = useListingsStore()

    return (
        <>  
            {isLoading && 
            <div>
                <div className="center">
                    <span className="loading-text">Loading...</span>
                    <div className="ring" />
                </div>
            </div>
            }
        </>
    )
}

export default LoadingCircle;