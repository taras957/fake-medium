import React, { useEffect } from 'react'
import useFetch from 'hooks/use-fetch'
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import { Link } from 'react-router-dom';
const PopularTags = () => {
    const [{response, isLoading, error}, doFetch] = useFetch('/tags')
    useEffect(() => {
      doFetch();
    }, [doFetch]);


    if(isLoading || !response) {
        return <Loading />
    }
    if(error) {
        return <ErrorMessage />
    }
    return (
        <div className={'sidebar'}>
            <p>Popular Tags</p>
            <div className="tag-list">
                {response.tags.map(tag => (
                  <Link to={`/tags/${tag}`}  className={'tag-default tag-pill'} key ={tag}>{tag}</Link>
                ))}
            </div>
        </div>
    )
}
            // {isLoading && < Loading />}
            // {error && < ErrorMessage />}
export default PopularTags
