import { get } from 'lodash';
import React, { PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';
import cookies from 'js-cookie';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { push as pushURL } from 'react-router-redux';
import { actions } from '../../store';

import CONTEXT_QUERY from '../../graphql/query/context.graphql';

const Nav = ({ isAuthenticated, data: { loading, settings }, logout }) => (
  <div>
    <NavLink to="/">Chat</NavLink>
    <NavLink to="/about">About</NavLink>

    {!isAuthenticated && !loading && (
      <a href={get(settings, 'github.url')}>Login with github</a>
    )}

    {isAuthenticated && !loading && <button onClick={logout}>Logout</button>}
  </div>
);

Nav.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,

    settings: PropTypes.shape({
      github: PropTypes.object
    })
  }).isRequired,

  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

Nav.defaultProps = {};

export default compose(
  connect(
    state => ({
      isAuthenticated: Boolean(state.app.auth.token),
    }),

    { pushURL, storeToken: actions.storeToken }
  ),

  graphql(CONTEXT_QUERY, {
    options: ownProps => ({
      variables: {
        isAuthenticated: ownProps.isAuthenticated
      }
    })
  }),

  withHandlers({
    logout: props => (event) => {
      if (event) {
        event.preventDefault();
      }

      props.pushURL('/');
      cookies.remove('token');
      props.storeToken(null);
    }
  })
)(Nav);
