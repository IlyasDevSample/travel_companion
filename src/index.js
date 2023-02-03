import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { ErrorBoundary } from 'react-error-boundary'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>
    <ErrorBoundary
        FallbackComponent={() => (
            <div
                className='fallback'
            >
                <h1 className="heading"><span className="welcome">Welcome, to</span> Travel Companion</h1>
                <button
                    onClick={() => {
                        window.location.reload();
                    }}
                    className="enter-btn"
                >
                    Enter the application</button>
            </div>
        )}
    >
        <Suspense fallback={<div>Loading...</div>}>
            <App />
        </Suspense>
    </ErrorBoundary>
);