import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from './Routes/AdminRoutes';
import "../Assets/css/developer.css"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<AdminRoutes />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
