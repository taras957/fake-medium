import React, { useEffect } from "react";
import { stringify } from "query-string";
import { getPaginator, limit } from "utils/utils";
import useFetch from "hooks/use-fetch";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import Feed from "components/Feed/Feed";
import Paggination from "components/Paggination/index";

const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username };
  return `/articles?${stringify(params)}`;
};

const UserArticles = ({ username, location, isFavorites, url }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const apiUrl = getApiUrl({ username, offset, isFavorites });
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);


  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites]);
  return (
    <div>
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
  );
};

export default UserArticles;
