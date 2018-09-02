
import moment from 'moment';

export default function TimerLogLatestEntries(props) {
  return (
    <div className='row'>
      <div className='col s12 m6'>
        <h5>Last 10 Logs</h5>
        <table className='striped'>
          <thead>
            <tr>
              <th>Action</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {
              props.userTimerLogs &&
              props.userTimerLogs.slice(-10).reverse().map(entry =>
                <tr key={entry.time}>
                  <td>
                    {
                      entry.action === 'start'
                        ? <i className='material-icons green-text text-lighten-2'>play_arrow</i>
                        : <i className='material-icons red-text text-lighten-2'>stop</i>
                    }
                  </td>
                  <td>{moment(entry.time).format('MMM D, YYYY (ddd)')}</td>
                  <td>{moment(entry.time).format('h:mm a')}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
