import React, { useState, useEffect } from "react";
import { stringify } from "query-string";
import Feed from "components/Feed";
import Paggination from "components/Paggination";
import useFetch from "hooks/use-fetch";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import PopularTags from "components/PopularTags/PopularTags";
import { getPaginator, limit } from "utils/utils";
import FeedToggler from "components/FeedToggler/FeedToggler";
const YourFeed = ({ location, match }) => {
  const url = match.url;
  const { offset, currentPage } = getPaginator(location.search);
  const stringifyParams = stringify({
    limit,
    offset,
  });
  const apiUrl = `/articles/feed?${stringifyParams}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

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
            <FeedToggler tagName={"foo"} />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
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
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourFeed;
