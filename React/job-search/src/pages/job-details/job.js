import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import sprite from "../../img/sprite.svg";
import { useParams } from "react-router-dom";

const Job = () => {
  let params = useParams();
  const jobId = params.id;

  const [job, setJob] = useState([]);
  const [otherJobs, setOtherJobs] = useState([]);

  useEffect(() => {
    const baseUrl = "https://teknorix.jobsoid.com/api/v1/";
    let dept = 0;
    async function fetchAPI() {
      await axios.get(`${baseUrl}jobs/${jobId}`).then((res) => {
        if (res?.data) {
          dept = res.data.department.id;
          setJob(res.data);
        }
      });

      await axios
        .get(`${baseUrl}jobs`, { params: { dept: dept } })
        .then((res) => {
          if (res?.data) {
            setOtherJobs(res.data);
          }
        });
    }
    fetchAPI();
  }, [jobId]);

  return (
    <Fragment>
      {job && (
        <div className="short">
          <div className="short__intro">
            {job.department &&
              `${job.department?.title} Department at teknorix
        systems goa`}
          </div>
          <h1 className="short__title">{job.title}</h1>
          <div className="short__params">
            <span className="short__params__item">
              <svg className="icon">
                <use xlinkHref={`${sprite}#icon-office`}></use>
              </svg>
              {job.department?.title}
            </span>
            <span className="short__params__item">
              <svg className="icon">
                <use xlinkHref={`${sprite}#icon-location`}></use>
              </svg>
              {job.location?.title}
            </span>
            <span className="short__params__item short__params__item--type">
              {job.type}
            </span>
          </div>
          <a
            className="btn btn--primary u-margin-top-medium"
            href={job.applyUrl}
          >
            Apply
          </a>
        </div>
      )}

      <div className="details u-margin-bottom-big">
        <div
          dangerouslySetInnerHTML={{ __html: job.description }}
          className="details__description u-margin-top-medium"
        ></div>
        <div className="details__sidebar u-margin-top-medium">
          <div className="details__otherjobs">
            <h2 className="details__otherjobs__heading"> Other job openings</h2>
            {otherJobs.map((job) => {
              return (
                <Fragment>
                  <h6 className="details__otherjobs__jobtitle">
                    <Link
                      className="details__otherjobs__link"
                      to={`/details/${job.id}`}
                    >
                      {job.title}
                    </Link>
                  </h6>
                  <div className="details__otherjobs__params">
                    <div className="details__otherjobs__params__item">
                      <svg className="icon">
                        <use xlinkHref={`${sprite}#icon-office`}></use>
                      </svg>
                      {job.department.title}
                    </div>
                    <div className="details__otherjobs__params__item">
                      <svg className="icon">
                        <use xlinkHref={`${sprite}#icon-location`}></use>
                      </svg>
                      {job.location.title}
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Job;
