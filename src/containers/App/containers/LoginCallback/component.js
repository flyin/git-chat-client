import cookies from 'js-cookie';
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { graphql } from 'react-apollo';
import { compose, withPropsOnChange, lifecycle } from 'recompose';
import URLSearchParams from 'url-search-params';
import { push as pushURL } from 'react-router-redux';
import { actions } from '../../store';

import CREATE_TOKEN_MUTATION from '../../graphql/mutation/create-token-by-code.graphql';

const LoginCallback = () => (
  <div>
    <Helmet title="Authenticating..." />

    <div>
      Authenticating...
    </div>
  </div>
);

LoginCallback.propTypes = {};
LoginCallback.defaultProps = {};

export default compose(
  connect(null, { pushURL, storeToken: actions.storeToken }),

  withPropsOnChange(
    (props, nextProps) => props.location.search !== nextProps.location.search,
    props => ({ code: new URLSearchParams(props.location.search).get('code') })
  ),

  graphql(CREATE_TOKEN_MUTATION, { options: { ssr: false } }),

  lifecycle({
    componentDidMount() {
      const code = this.props.code;

      if (!code) {
        return;
      }

      this.props.mutate({ variables: { code } })
        .then(({ data }) => {
          cookies.set('token', data.token.token, { expires: 7 });
          this.props.storeToken(data.token);
          this.props.pushURL('/');
        })

        .catch(err => console.log(err)); // eslint-disable-line
    }
  })
)(LoginCallback);
