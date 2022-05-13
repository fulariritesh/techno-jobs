import { Link } from "react-router-dom";
import sprite from "../../../img/sprite.svg";

const SearchItem = (props) => {
  const { job } = props;

  return (
    <div className="jobitem u-margin-top-medium u-margin-bottom-big">
      <div className="jobitem__details">
        <h3 className="jobitem__title">{job.title}</h3>
        <div className="jobitem__params">
          <div className="jobitem__params__item">
            <svg className="icon">
              <use xlinkHref={`${sprite}#icon-office`}></use>
            </svg>
            {job.department.title}
          </div>
          <div className="jobitem__params__item">
            <svg className="icon">
              <use xlinkHref={`${sprite}#icon-location`}></use>
            </svg>
            {job.location.title}
          </div>
          <div className="jobitem__params__item--type">{job.type}</div>
        </div>
      </div>
      <a className="btn btn--primary" href={job.applyUrl} target="_blank">
        Apply
      </a>
      <Link className="btn btn--link" to={`/details/${job.id}`}>
        View
      </Link>
    </div>
  );
};

export default SearchItem;
