import React from "react";
import "./Pagination.css";
export const Pagination = ({ totalUsers, usersPerPage, paginate , currentPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  const checkIfActive = (i) => {
    if (i === currentPage) {
      return "darkorange"
    }
  }
  
  return (
    <div>
      <ul className="pages-list">
        {pageNumbers.map(number => {
          return (
            <li style={{color:checkIfActive(number)}} className="page-item" key={number}>
              <h1 onClick={() => paginate(number)}>{number}</h1>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
