import React from 'react'
import { Link } from 'react-router-dom'
import {range} from 'utils/utils'
import cn from "classnames";

const PaginationItem =({page,url, currentPage}) => {

    const liClasses = cn("page-item", {
      active: currentPage === page,
    });

    
    return (
      <li className={liClasses}>
        <Link to={`${url}?page=${page}`} className="page-link">
          {page}
        </Link>
      </li>
    );

}
const Paggination = ({total, limit,url,currentPage}) => {
    const pagesCount = Math.ceil(total / limit);
    const pages = range(1, pagesCount);
    return (
      <ul className="pagination">
        {pages.map((page) => (
          <PaginationItem
            page={page}
            url={url}
            currentPage={currentPage}
            key={page}
          />
        ))}
      </ul>
    );
}

export default Paggination
