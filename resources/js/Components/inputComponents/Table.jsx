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
                                    <th key={index}>{header.Title}</th>
                                ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                data.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                    {headers.map((header, colIndex) => (
                                        <td key={colIndex}>
                                        {header.type === "status" ? (
                                            <label className={getBadgeClass(row[header.value])}>
                                            {row[header.value]}
                                            </label>
                                        ) : (
                                            row[header.value] != null ? row[header.value] : 'N/A'
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
