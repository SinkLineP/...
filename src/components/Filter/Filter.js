import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scrollslider from '../Scrollslider/Scrollslider';
import axios from 'axios';
import './Filter.scss';

class Filteremployees extends Component {
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
    let groups = Object.fromEntries(
      Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ', (group) => [
        group,
        { children: [], group },
      ])
    );

    for (let e of this.props.storeUsers) {
      let letter = e.firstName[0]
        .normalize('NFD')
        .replace(/[^a-z]/gi)
        .toUpperCase();
      groups[letter].children.push(e);
    }

    groups = Object.entries(groups);
    this.setState({
      sortUsers: groups,
    });
  };

  render() {
    console.log(this.state.sortUsers);
    return (
      <>
        <div className='two-blocks'>
          <div className='employees'>
            <div className='employees-title'>
              <h1>Employees</h1>
            </div>
            <div className='employees-container'>
              <Scrollslider _class='items'>
                {this.state.sortUsers.map((element) => {
                  return (
                    <>
                      <div className='item'>
                        <b className='item-liter'>{element[0]}</b>
                        {element[1].children.length == 0 ? (
                          <p>No Employees</p>
                        ) : (
                          <p>
                            {element[1].children.map((item) => {
                              return (
                                <>
                                  <p>{item.firstName + ' ' + item.lastName}</p>
                                  <input
                                    type='radio'
                                    value={false}
                                    name={item.id}
                                    data-id='active'
                                    defaultChecked={true}
                                  />
                                  <label htmlFor='active'>not active</label>
                                  <br />
                                  <input
                                    type='radio'
                                    value={true}
                                    name={item.id}
                                    data-id='not-active'
                                  />
                                  <label htmlFor='not-active'>active</label>
                                </>
                              );
                            })}
                          </p>
                        )}
                      </div>
                    </>
                  );
                })}
              </Scrollslider>
            </div>
          </div>
          <div className='employees-birthday'>
            <div className='employees-birthday-title'>
              <h1>Employees Birthday</h1>
            </div>
            <div className='employees-birthday-container'></div>
          </div>
        </div>
      </>
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
)(Filteremployees);
