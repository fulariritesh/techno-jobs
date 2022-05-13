import { Fragment, useEffect, useState } from "react";
import { useContext } from "react";
import { FilterContext } from "../../../Store";
import axios from "axios";

const SearchBar = () => {
  const filterCtx = useContext(FilterContext);

  const [defaultTitle, setDefaultTitle] = useState("");
  const [defaultDepartmentValue, setDefaultDepartmentValue] = useState(-1);
  const [defaultLocationValue, setDefaultLocationValue] = useState(-1);
  const [defaultProcedureValue, setDefaultProcedureValue] = useState(-1);

  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [functions, setFunctions] = useState([]);

  const titleEnteredHandler = (e) => {
    if (e.key === "Enter") {
      filterCtx.addFilter({ type: "title", label: e.target.value });
    }
  };

  useEffect(() => {
    const baseUrl = "https://teknorix.jobsoid.com/api/v1/";
    axios.get(`${baseUrl}departments`).then((res) => {
      if (res?.data) {
        setDepartments(res.data);
      }
    });

    axios.get(`${baseUrl}locations`).then((res) => {
      if (res?.data) {
        setLocations(res.data);
      }
    });

    axios.get(`${baseUrl}functions`).then((res) => {
      if (res?.data) {
        setFunctions(res.data);
      }
    });
  }, []);

  return (
    <Fragment>
      <div className="searchbar__block searchbar__filters">
        <input
          className="searchbar__inputs jobtext"
          type="text"
          placeholder="Search for Job"
          onKeyDown={titleEnteredHandler}
          onChange={(e) => {
            setDefaultTitle(e.target.value);
          }}
          value={defaultTitle}
        ></input>

        <select
          className="searchbar__inputs"
          value={defaultDepartmentValue}
          onChange={(e) => {
            let index = e.nativeEvent.target.selectedIndex;
            setDefaultDepartmentValue(e.target.value);
            filterCtx.addFilter({
              type: "department",
              value: e.target.value,
              label: e.nativeEvent.target[index].text,
            });
          }}
        >
          <option value="-1" disabled>
            --Select Department--
          </option>
          {departments?.map((department) => {
            return (
              <option key={department.id} value={department.id}>
                {department.title}
              </option>
            );
          })}
        </select>
        <select
          className="searchbar__inputs"
          value={defaultLocationValue}
          onChange={(e) => {
            let index = e.nativeEvent.target.selectedIndex;
            setDefaultLocationValue(e.target.value);
            filterCtx.addFilter({
              type: "location",
              value: e.target.value,
              label: e.nativeEvent.target[index].text,
            });
          }}
        >
          <option value="-1" disabled>
            --Select Location--
          </option>
          {locations?.map((location) => {
            return (
              <option key={location.id} value={location.id}>
                {location.title}
              </option>
            );
          })}
        </select>
        <select
          className="searchbar__inputs"
          value={defaultProcedureValue}
          onChange={(e) => {
            let index = e.nativeEvent.target.selectedIndex;
            setDefaultProcedureValue(e.target.value);
            filterCtx.addFilter({
              type: "function",
              value: e.target.value,
              label: e.nativeEvent.target[index].text,
            });
          }}
        >
          <option value="-1" disabled>
            --Select Procedure--
          </option>
          {functions?.map((func) => {
            return (
              <option key={func.id} value={func.id}>
                {func.title}
              </option>
            );
          })}
        </select>
      </div>
      <div className="searchbar__block searchbar__selectedfiltersblock u-margin-top-small">
        <div className="searchbar__selectedfilters">
          {filterCtx.filterList?.map((item) => {
            return (
              <div className="searchbar__selectedfilters__item" key={item.type}>
                {item.label}
                <span
                  className="searchbar__selectedfilters__remove"
                  onClick={() => {
                    filterCtx.removeFilter(item.type);
                    switch (item.type) {
                      case "title":
                        setDefaultTitle("");
                        break;
                      case "department":
                        setDefaultDepartmentValue(-1);
                        break;
                      case "location":
                        setDefaultLocationValue(-1);
                        break;
                      case "function":
                        setDefaultProcedureValue(-1);
                        break;
                      default:
                        return;
                    }
                  }}
                >
                  &times;
                </span>
              </div>
            );
          })}
        </div>
        <div
          className="searchbar__clearfilters"
          onClick={() => {
            setDefaultDepartmentValue(-1);
            setDefaultLocationValue(-1);
            setDefaultProcedureValue(-1);
            setDefaultTitle("");
            filterCtx.clearFilter();
          }}
        >
          Clear All
        </div>
      </div>
    </Fragment>
  );
};

export default SearchBar;
