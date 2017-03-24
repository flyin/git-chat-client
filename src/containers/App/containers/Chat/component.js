import React from 'react';
import Helmet from 'react-helmet';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import CONTEXT_QUERY from '../../graphql/query/context.graphql';

const Chat = () => (
  <div>
    <Helmet title="Chat" />
    Chat container here
  </div>
);

Chat.propTypes = {};
Chat.defaultProps = {};

export default compose(
  connect(state => ({
    isAuthenticated: Boolean(state.app.auth.token)
  })),

  graphql(CONTEXT_QUERY, {
    options: ownProps => ({
      variables: {
        isAuthenticated: ownProps.isAuthenticated
      }
    })
  })
)(Chat);
