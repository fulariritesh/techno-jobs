import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

const actionTypes = {
  add: "ADD_FILTER",
  remove: "REMOVE_FILTER",
  clear: "CLEAR_FILTER",
};

export const FilterContext = createContext({
  selectedFilters: [null, null, null, null],
  addFilter: (id, value) => {},
  removeFilter: (id) => {},
  clearFilters: () => {},
  jobs: [],
});

const reducerAction = (prevState, action) => {
  switch (action.type) {
    case actionTypes.add:
      const cleanedPrevState = prevState.filter((elem) => {
        return elem.type !== action.payload.type;
      });

      return [...cleanedPrevState, action.payload];
    case actionTypes.remove:
      return prevState.filter((item) => item.type !== action.payload);

    case actionTypes.clear:
      return [];
    default:
      return prevState;
  }
};

export const JobListContextProvider = (props) => {
  const [filters, filtersDispatch] = useReducer(reducerAction, []);
  const [jobList, setJobList] = useState([]);

  const addFilterHandler = (filter) => {
    filtersDispatch({
      type: actionTypes.add,
      payload: filter,
    });
  };

  const removeFilterHandler = (type) => {
    filtersDispatch({
      type: actionTypes.remove,
      payload: type,
    });
  };

  const clearFiltersHandler = () => {
    filtersDispatch({
      type: actionTypes.clear,
    });
  };

  useEffect(() => {
    let filter = {
      q: "",
      dept: 0,
      loc: 0,
      fun: 0,
    };
    if (filters) {
      filters.map((elem) => {
        if (elem.type === "title") {
          filter.q = elem.label;
        } else if (elem.type === "department") {
          filter.dept = elem.value;
        } else if (elem.type === "location") {
          filter.loc = elem.value;
        } else if (elem.type === "function") {
          filter.fun = elem.value;
        }
        return elem;
      });
    }

    axios
      .get(`https://teknorix.jobsoid.com/api/v1/jobs`, { params: filter })
      .then((res) => {
        if (res?.data) {
          setJobList(groupBy(res.data, "department"));
        }
      });
  }, [filters]);

  const groupBy = function (xs) {
    return xs.reduce(function (acc, x) {
      if (!acc.hasOwnProperty(x.department.title)) {
        acc[x.department.title] = [x];
      } else {
        acc[x.department.title] = [...acc[x.department.title], x];
      }
      return acc;
    }, {});
  };

  return (
    <FilterContext.Provider
      value={{
        filterList: filters,
        addFilter: addFilterHandler,
        removeFilter: removeFilterHandler,
        clearFilter: clearFiltersHandler,
        jobs: jobList,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};
