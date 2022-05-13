import { Fragment } from "react";
import SearchItem from "../search-item/SearchItem";

const SearchGroup = (props) => {
  const { name, groupJobs } = props;

  return (
    <Fragment>
      <h1 className="u-margin-top-small jobgroup__title">{name}</h1>
      {groupJobs.map((job) => {
        return <SearchItem key={job.id} job={job}></SearchItem>;
      })}
    </Fragment>
  );
};

export default SearchGroup;
