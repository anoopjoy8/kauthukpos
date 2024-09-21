import {React, useState} from 'react'
import { Link } from "react-router-dom";
import AddButton from '../Common/AddButton';
import LoadMoreButton from '../Common/LoadMoreButton';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import { mdiBookEdit } from '@mdi/js';
import SearchButton from '../Common/SearchButton';
import SearchSection from './searchSection';

function Table({headers, 
    data, 
    addButtonLink,
    editButtonLink,
    handleLoadMore,
    isLoading,
    tableTitle,
    addTitle,
    searchButtonTitle,
    searchButtonEnabled,
    searchButtonLink,
    searchInputFields,
    handleSearchOnChange,
    handleSubmitSearch
}) {
    const [searchDiv, setSearchDiv] = useState(false);
    const getBadgeClass = (status) => {
        return status === 'active' ? 'badge badge-success' : 'badge badge-warning';
    };
    const onSearchSubmit = () => {
        setSearchDiv(!searchDiv);
    }
    const handleSearch = (event)=>{
        handleSearchOnChange(event);
    }
    const handleDelete = ()=>{

    }
    return (
        <>
            <div class="col-lg-12">
                <div class="card no-background">
                    <div class="row d-flex justify-content-end">
                        <div class="col-md-12 d-flex justify-content-end">
                            {searchButtonEnabled && (
                                <SearchButton
                                    title={searchButtonTitle}
                                    link={addButtonLink}
                                    onClick = {onSearchSubmit}
                                />
                            )}
                            <AddButton
                                title={addTitle}
                                link = {addButtonLink}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {searchDiv && (
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <SearchSection searchInputFields = {searchInputFields}
                                onChange = {handleSearch}
                                title = {searchButtonTitle}
                                onClick = {onSearchSubmit}
                                onSubmit ={handleSubmitSearch}
                            />
                        </div>
                    </div>
                </div>
            )}
            <div class="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 d-flex justify-content-left">
                                <h4 className="card-title d-flex align-items-center">{tableTitle}</h4>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                    {headers.map((header, index) => (
                                        <th key={index}>{header.Title}</th>
                                    ))}
                                    <th>Action</th>
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
                                        <td>
                                            <span className="cursor-point">
                                            <Link
                                                to={`${editButtonLink}/${row.ID}`}
                                            >
                                                <Icon path={mdiBookEdit} size={1} />
                                            </Link>
                                            <span onClick={handleDelete}><Icon path={mdiDelete} size={1} /></span>
                                            </span>
                                        </td>
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
                        <div className="d-flex justify-content-center mt-3">
                            <LoadMoreButton onClick = {handleLoadMore}
                                isLoading = {isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Table
