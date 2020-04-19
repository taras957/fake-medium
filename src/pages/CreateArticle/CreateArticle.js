import React, { useEffect, useState, useContext} from "react";
import ArticleForm from 'components/ArticleForm/ArticleForm'
import useFetch from 'hooks/use-fetch'
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import { Redirect } from 'react-router-dom'
import { CurrentUserContext } from "context/currentUser";


const CreateArticle = () => {
   const [currentUserState] = useContext(CurrentUserContext);
    const ApiUrl = '/articles'
    const[{response,error}, doFetch]=useFetch(ApiUrl)
    const initilValues = {
        title:'',
        description: '',
        body: '',
        tagList: []
    }
    const[isSuccessSubmit,setIsSuccessSubmit]= useState(false)
    const handleSubmit = article => {
        doFetch({
            method: 'post',
            data: {
                article
            }
        })
    }

    useEffect(() => {
        if(!response){
            return
        }
        setIsSuccessSubmit(true)
    }, [response])

    if(currentUserState.isLoggedIn===false){
        return <Redirect to={`/`} />;
    }

    if(isSuccessSubmit){
     return   <Redirect to={`/article/${response.article.slug}`}/>
    }
    return (
      <div>
        {error && <ErrorMessage backendErrors={error} />}
        <ArticleForm
          errors={(error && error.error) || {}}
          initilValues={initilValues}
          onSubmit={handleSubmit}
        />
      </div>
    );
}

export default CreateArticle
