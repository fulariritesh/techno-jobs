import { React } from "react";

import SearchBar from "./search-bar/SearchBar";
import { JobListContextProvider } from "../../Store";
import SearchResults from "./search-results/SearchResults";

const JobList = () => {
  return (
    <JobListContextProvider>
      <SearchBar></SearchBar>
      <SearchResults></SearchResults>
    </JobListContextProvider>
  );
};

export default JobList;
