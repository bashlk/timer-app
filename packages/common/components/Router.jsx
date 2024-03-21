import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import history from "history/browser";

const Router = ({ routes, children }) => {
    const [currentPath, setCurrentPath] = useState(history.location.pathname);

    useEffect(() => {
        return history.listen(({ location }) => {
            setCurrentPath(location.pathname);
        });
    });

    const currentRoute = routes.find(route => route.path === currentPath);

    if (!currentRoute) {
        return children(null);
    }

    return children(currentRoute.name);
};

Router.propTypes = {
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    children: PropTypes.func.isRequired,
  };

export default Router;