import React, { useState, useEffect } from "react";
import {stringify} from 'query-string'
import Feed from 'components/Feed'
import Paggination from 'components/Paggination'
import useFetch from 'hooks/use-fetch'
import { getPaginator, limit } from "utils/utils";
const GlobalFeed = ({location,match}) => {
  const url = match.url
  const { offset, currentPage } = getPaginator(location.search);
  const stringifyParams = stringify({
    limit,
    offset
  })
  const apiUrl =`/articles?${stringifyParams}`
  const [{response,isLoading,error},doFetch] =useFetch(apiUrl)
  

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);
   console.log(response);
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p> A place to share knowladge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {isLoading && <div>Loading...</div>}
            {error && <div>Some error happen</div>}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Paggination
                  total={response.articlesCount}
                  limit={limit}
                  url={url}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
          <div className="col-md-3">Populat tags</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
