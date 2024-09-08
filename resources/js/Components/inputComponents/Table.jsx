import React from 'react'
import AddButton from '../Common/AddButton';

function Table({headers, data, addButtonLink}) {
    const getBadgeClass = (status) => {
        return status === 'Active' ? 'badge badge-success' : 'badge badge-warning';
    };
    return (
        <>
            <div class="card">
                <div class="card-body">
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-left">
                            <h4 class="card-title d-flex align-items-center">List Admin Users</h4>
                        </div>
                        <AddButton
                            title="Add Users"
                            link = {addButtonLink}
                        />
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                {headers.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                data.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                    {headers.map((header, colIndex) => (
                                        <td key={colIndex}>
                                            {header === "Status" ? (
                                                <label className={getBadgeClass(row[header])}>{row[header]}</label>
                                            ) : (
                                                row[header] !== null && row[header] !== undefined ? row[header] : 'N/A'
                                            )}
                                        </td>
                                    ))}
                                    </tr>
                                ))
                                ) : (
                                <tr>
                                    <td colSpan={headers.length} style={{ textAlign: 'center' }}>
                                    No data available
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Table
