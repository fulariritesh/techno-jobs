import logo from "./logo.svg";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import JobList from "./pages/job-list/jobList";
import JobDetails from "./pages/job-details/jobDetails";
import Error from "./pages/Error";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<JobList />} />
          <Route path="details" element={<JobDetails />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
