import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scrollslider from '../Scrollslider/Scrollslider';
import axios from 'axios';
import './Filter.scss';
import OpinionPoll from '../OpinionPoll/OpinionPoll';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterUsers: [],
    };
  }

  async componentDidMount() {
    const baseUrl =
      'https://yalantis-react-school-api.yalantis.com/api/task0/users';

    await axios.get(baseUrl).then((response) => {
      let allUsers = [];
      response.data.map((item) => {
        const { id, firstName, lastName, dob } = item;
        const el = {
          id: id,
          firstName: firstName,
          lastName: lastName,
          dob: dob,
          active: 'false',
        };
        allUsers.push(el);
        this.props.onAddUsers(el);
      });
      this.filterUsers();
    });
  }
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
      filterUsers: groups,
    });
  };

  updateData = (value) => {
    this.setState((prevState) => ({
      filterUsers: prevState.filterUsers.map((element) => {
        return [
          element[0],
          {
            children: element[1].children.map((el) => {
              if (el.id === value.id) {
                return { ...el, active: value.active };
              }
              return el;
            }),
          },
        ];
      }),
    }));
  };

  render() {
    console.log(this.state.filterUsers);
    return (
      <>
        <div className='two-blocks'>
          <div className='employees'>
            <div className='employees-title'>
              <h1>Employees</h1>
            </div>
            <div className='employees-container'>
              <Scrollslider _class='items'>
                {this.state.filterUsers.map((e) => {
                  return (
                    <>
                      <div className='item'>
                        <b className='item-liter'>{e[0]}</b>
                        {e[1].children.length == 0 ? (
                          <p>No Employees</p>
                        ) : (
                          <div>
                            {e[1].children.map((item) => {
                              if (item.active == 'true') {
                                return (
                                  <>
                                    <p style={{ color: 'blue' }}>
                                      {item.firstName + ' ' + item.lastName}
                                    </p>
                                    <OpinionPoll
                                      inputName={item.id}
                                      item={item}
                                      updateData={this.updateData}
                                    />
                                  </>
                                );
                              } else {
                                return (
                                  <>
                                    <p>
                                      {item.firstName + ' ' + item.lastName}
                                    </p>
                                    <OpinionPoll
                                      inputName={item.id}
                                      item={item}
                                      updateData={this.updateData}
                                    />
                                  </>
                                );
                              }
                            })}
                          </div>
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
            <div className='employees-birthday-container'>
              <ul>
                {this.props.storeUsers.map((item, key) => {
                  if (item.active == 'true') {
                    return (
                      <li key={key}>
                        <b>
                          {item.firstName +
                            ' ' +
                            item.lastName +
                            ' - ' +
                            item.dob}
                        </b>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
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
)(Filter);
