import React from "react";
import useFetch from "hooks/use-fetch";
import classNames from "classnames";
const AddToFavorite = ({ isFavorited, favoritesCount, articleSlug }) => {
  const apiUrl = `/articles/${articleSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const favoritesCountWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount;

  const isFavoritedWithResponse = response
    ? response.article.isFavorited
    : isFavorited;

  const buttonClasses = classNames({
    btn: true,
    "btn-sm": true,
    "btn-primary": isFavoritedWithResponse,
    "btn-outline-primary": !isFavoritedWithResponse,
  });
  const handleLike = (e) => {
    e.preventDefault();
    doFetch({
      method: isFavoritedWithResponse ? "delete" : "post",
    });
  };

  return (
    <button className={buttonClasses} onClick={handleLike}>
      <span>&nbsp; {favoritesCountWithResponse}</span>
    </button>
  );
};

export default AddToFavorite;
