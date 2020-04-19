import React, { useEffect,useState, useContext } from "react";
import useFetch from "hooks/use-fetch";
import { Link, Redirect } from "react-router-dom";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import TagList from "components/TagList/TagList";
import { CurrentUserContext } from "context/currentUser";

const Article = (props) => {
  const [currentUserState] = useContext(CurrentUserContext);
  const slug = props.match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [{ isLoading:fetchArticleIsLoading, response: fetchArticleResponse, error:fetchArticleError }, doFetch] = useFetch(apiUrl);
  const [{  response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl);
  const [isSuccessfullDelete, setSuccessfullDelete] =useState(false)
  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
      return false;
    }

    return (
      fetchArticleResponse.article.author.username === currentUserState.currentUser.username
    );
  };
  const deleteArticle = () => {
    doDeleteArticle({
      method:'delete'
    });
    
  }
  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse){
      return
    } setSuccessfullDelete(true);
  }, [deleteArticleResponse]);

  if(isSuccessfullDelete) {
   return  <Redirect to='/'/>
  }
  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link
                to={`/profiles/${fetchArticleResponse.article.author.username}`}
              >
                <img src={fetchArticleResponse.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${fetchArticleResponse.article.author.username}`}
                >
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">
                  {fetchArticleResponse.article.createdAt}
                </span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    to={`/article/${fetchArticleResponse.article.slug}/edit`}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    Edit Article
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={deleteArticle}
                  >
                    Delete article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loading />}
        {fetchArticleError && <ErrorMessage />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div className="">
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList tags={fetchArticleResponse.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
