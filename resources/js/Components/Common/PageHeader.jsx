import React from 'react'
import { useSelector } from "react-redux";
function PageHeader() {
    const data = useSelector((state) => state);
    return (
        <div className="page-header">
            <h3 className="page-title">{data.currentAction.currentTitle}</h3>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">{data.currentAction.mainMenu}</a></li>
                <li className="breadcrumb-item active" aria-current="page"> {data.currentAction.subMenu} </li>
            </ol>
            </nav>
        </div>
    )
}

export default PageHeader
