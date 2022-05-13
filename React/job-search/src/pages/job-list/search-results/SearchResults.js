import SearchGroup from "../search-group/SearchGroup";
import { useContext } from "react";
import { FilterContext } from "../../../Store";

const SearchResults = () => {
  const filterCtx = useContext(FilterContext);

  const jobGroups = filterCtx.jobs;

  return Object.keys(jobGroups).map(function (key, index) {
    return (
      <SearchGroup
        key={key}
        name={key}
        groupJobs={jobGroups[key]}
      ></SearchGroup>
    );
  });
};

export default SearchResults;
