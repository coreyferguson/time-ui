
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Container from '../../container/views/Container';
import UnknownServerError from '../../Error/UnknownServerError';
import Loading from '../../Loading/IndeterminateLinear';

import './TimerLogView.scss';

const timerId = getParameterByName('id');

const query = gql`
  {
    me {
      timer(id: "${timerId}") {
        name
        logs(pageSize: 1000) {
          data {
            action
            time
          }
          hasAfter
          after
        }
      }
    }
  }
`;

const TimerLogView = () => (
  <Query query={query}>
    {({ loading, error, data }) => {
      return (
        <Container>
          <div className='timer-list'>
            {error && <UnknownServerError />}
            <div className='row'>
              <h4 className='title'>
                <span className='timer-id'>{timerId}</span>
                <a href={`/edittimer?id=${timerId}`}>
                  <i className="material-icons">edit</i>
                </a>
              </h4>
              {loading && <Loading />}
            </div>
          </div>
        </Container>
      );
    }}
  </Query>
);

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


export default TimerLogView;
