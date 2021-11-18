import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Scrollslider from '../Scrollslider/Scrollslider';
import './Employees.scss';

class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortUsers: [],
    };
  }

  componentDidMount = () => {
    const baseUrl =
      'https://yalantis-react-school-api.yalantis.com/api/task0/users';

    axios.get(baseUrl).then((response) => {
      response.data.map((item) => {
        this.props.onAddUsers(item);
      });
      this.filterUsers();
    });
  };

  filterUsers = () => {
    this.props.storeUsers.sort((a, b) =>
      a.firstName.localeCompare(b.firstName, 'es', { sensitivity: 'base' })
    );

    let data = this.props.storeUsers.reduce((r, e) => {
      let alphabet = e.firstName[0];
      if (!r[alphabet]) r[alphabet] = { alphabet, record: [e] };
      else r[alphabet].record.push(e);
      return r;
    }, {});

    let result = Object.values(data);
    console.log(result);
    this.setState({
      sortUsers: result,
    });
  };

  render() {
    return (
      <div>
        <p>Employees</p>
        <br />
        <div className='container'>
          <Scrollslider _class='items'>
            {this.state.sortUsers.map(({ alphabet, record, key }) => {
              return (
                <>
                  <div id={key} className='item'>
                    <p className='item-liter' key={key}>
                      <b>{alphabet}</b>
                    </p>
                    <br />
                    {record.map(({ id, firstName, lastName }) => {
                      return (
                        <>
                          <p key={id}>{firstName + ' ' + lastName}</p>
                          <input
                            type='radio'
                            value={false}
                            name={id}
                            data-id='active'
                            defaultChecked={true}
                          />
                          <label htmlFor='active'>not active</label>
                          <br />
                          <input
                            type='radio'
                            value={true}
                            name={id}
                            data-id='not-active'
                          />
                          <label htmlFor='not-active'>active</label>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </Scrollslider>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    storeUsers: state.users,
  }),
  (dispatch) => ({
    onAddUsers: (addUsers) => {
      dispatch({ type: 'ADD_USERS', payload: addUsers });
    },
  })
)(Employees);
