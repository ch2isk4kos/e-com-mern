import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  let dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const { history } = useHistory();

  const handleOnChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form className="form-inline my-2 my-lg-1 " onSubmit={handleOnSubmit}>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="search"
        value={text}
        onChange={handleOnChange}
      />
      {/* <SearchOutlined className="m-0" /> */}
    </form>
  );
};

export default Search;
