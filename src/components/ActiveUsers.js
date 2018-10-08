import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Import CSS */
import './css/activeusers.css';


class Project extends Component {
  constructor(props){
      super(props);
      this.state = {
          users: props.users
      }
  }

  render() {
    let sortedList = this.state.users.sort((x,y) => x.points < y.points);
    sortedList = sortedList.map(x => (
      <li>
        <span>{x.name}</span>
        <span>{x.points}</span>
      </li>
    ));

    if(sortedList.length){
        return (
            <div className="realClass">
                <div>
                    <h2>Aktiva spelare</h2>
                    <h2>({sortedList.length})</h2>
                </div>
                <ul>
                    {sortedList}
                </ul>
            </div>
        )
    } else {
        return (
            <div className="activeUsersDiv">
                <div>
                    <h2>Inga aktiva spelare</h2>
                </div>
            </div>
        )
    }
  }
}


let mapStateToProps = state => ({
  value: state.value,
  users: state.users
});

export default connect(mapStateToProps)(Project);
