import React, { useEffect, useState,useContext } from "react";
import ArticleForm from 'components/ArticleForm/ArticleForm'
import useFetch from 'hooks/use-fetch'
import { Redirect } from "react-router-dom";
import { CurrentUserContext } from "context/currentUser";



const EditArticle = ({match}) => {
    const slug =match.params.slug
    const [currentUserState] = useContext(CurrentUserContext)
    const apiUrl = `/articles/${slug}`
    const[{response:fetchArticleResponse},doFetchArticle] =useFetch(apiUrl)
    const [{ response: updateArticleResponse,error: updateArticleError }, doUpdateArticle] = useFetch(apiUrl);
    const [initilValues,setInitialValues]= useState(null);
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] =useState(false)
    useEffect(() => {
      doFetchArticle()
    }, [doFetchArticle]);

    useEffect(() => {
        if(!fetchArticleResponse) {
            return 
        }
      setInitialValues({
        title: fetchArticleResponse.article.title,
        description: fetchArticleResponse.article.description,
        body: fetchArticleResponse.article.body,
        tagList: fetchArticleResponse.article.tagList,
      });
    }, [fetchArticleResponse]);

    useEffect(() => {
        if(!updateArticleResponse){
            return
        }
        setIsSuccessfullSubmit(true)
    }, [updateArticleResponse]);


  const  handleSubmit= (article)=> {
      doUpdateArticle({
          method: 'put',
          data: {
              article
          }
      })
  }
  if(currentUserState.isLoggedIn === false){
      return <Redirect to='/' />;
  }
  if(isSuccessfullSubmit){
      return <Redirect  to={`/article/${slug}`}/>
  }
    return (
      <ArticleForm
        onSubmit={handleSubmit}
        errors={(updateArticleError && updateArticleError.errors) || {}}
        initilValues={initilValues}
      />
    );
}

export default EditArticle
