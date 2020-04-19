import React, { useState, useEffect } from "react";
const ArticleForm = ({ onSubmit, errors, initilValues }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [description, setDescription] = useState("");
  const [tagList, setTagList] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const article ={ 
        title,
        description,
        body,
        tagList,
    }
    onSubmit( article );
  };

  useEffect(() => {
    if (!initilValues) {
      return;
    }
    setTitle(initilValues.title);
    setBody(initilValues.body);
    setDescription(initilValues.description);
    setTagList(initilValues.tagList.join(" "));
  }, [initilValues]);

  return (
    <div className={"editor-page"}>
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <span>{errors.article?.join("")}</span>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article-title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="What is this article about"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article in markdown"
                    value={body}
                    onChange={(e) => {
                      setBody(e.target.value);
                    }}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Tags"
                    value={tagList}
                    onChange={(e) => {
                      setTagList(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <button
                    type="submit"
                    className="btn btn-lg pull-xs-rigth btn-primary"
                  >
                    Publish Article
                  </button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;
