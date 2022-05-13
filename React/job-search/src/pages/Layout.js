import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="layout__header">Teknorix - Job Search Engine</header>

      <div className="u-margin-top-small">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
