
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import IndeterminateLinear from '../../Loading/IndeterminateLinear';
import './TimerList.scss';

const query = gql`
  {
    me {
      timers {
        id
        name
      }
    }
  }
`;

const TimerList = () => (
  <Query query={query}>
    {({ loading, error, data }) => {
      return (
        <div className='timer-list'>
          {renderHeader()}
          {renderError(error)}
          {renderLoading(loading)}
          {renderUserTimers(data)}
        </div>
      );
    }}
  </Query>
);

function renderHeader() {
  return (
    <div className='row'>
      <div className='col s6'>
        <h4>Timers</h4>
      </div>
      <div className='col s6' style={{marginTop: '1em'}}>
        <div className='right-align'>
          <a
              href='/addtimer'
              className='btn-floating btn-large waves-effect waves-light red'>
            <i className='material-icons'>add</i>
          </a>
        </div>
      </div>
    </div>
  );
};

function renderError(error) {
  return error && <UnknownServerError />;
}

function renderLoading(loading) {
  return loading && <IndeterminateLinear />;
}

function renderUserTimers(data) {
  if (!data || !data.me || !data.me.timers) return;
  const timers = data.me.timers;
  const items = timers.map(timer =>
    <a key={timer.id} className='collection-item' href={`/timerLog?id=${timer.id}`}>
      {timer.name}
    </a>
  );
  return (
    <div className='collection'>
      {items}
    </div>
  );
};

export default TimerList;
