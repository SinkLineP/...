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
      filterBirthdayUsers: [],
    };
  }

  async componentDidMount() {
    const baseUrl =
      'https://yalantis-react-school-api.yalantis.com/api/task0/users';

    await axios.get(baseUrl).then((response) => {
      response.data.map((item) => {
        const { id, firstName, lastName, dob } = item;
        const monthUser = this.createDate(dob).split(' ')[0];
        const el = {
          id: id,
          firstName: firstName,
          lastName: lastName,
          dob: dob,
          active: 'false',
          month: monthUser,
        };
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

  sortUserBirthday = (activeUsers) => {
    // let reduceArray = [];
    const users = activeUsers.reduce(
      (obj, { id, dob, lastName, firstName }) => {
        const customer = {
          id: id,
          firstName: firstName,
          lastName: lastName,
          dob: dob,
        };
        // console.log(dob);
        // console.log(lastName);
        // console.log(this.createDate(dob).split(' ')[0]);
        const monthDob = this.createDate(dob).split(' ')[0];
        console.log(monthDob);
        if (!obj[monthDob]) obj[monthDob] = [];
        obj[monthDob].push(customer);
        // app.innerHTML = obj[monthDob];
        // console.log(obj);
        // this.setState({
        //   filterBirthdayUsers: obj,
        // });
        let result = Object.value(obj);
        console.log(result);

        return obj;
      },
      {}
    );
    // let result = Object.value(users);
    // reduceArray.push(users);
    // this.setState({
    //   filterBirthdayUsers: reduceArray,
    // });
    console.log(users);
    // this.setState({
    //   filterBirthdayUsers: users,
    // });
    // console.log(users);
    // console.log(users);
    // return users;
  };

  createDate = (date) => {
    let dateBirthday = new Date(date);

    let formatter = new Intl.DateTimeFormat('en', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    return formatter.format(dateBirthday);
  };

  render() {
    let arrayMonths = ['Employees List is empty'];
    this.props.storeUsers.map((item) => {
      if (item.active == 'true') {
        arrayMonths = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
      }
    });
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
              <table>
                <tbody>
                  <tr>
                    <ul>
                      {arrayMonths.map((month) => {
                        return (
                          <>
                            <tr>
                              <td>
                                <b>{month}</b>
                                <br />
                                {this.props.storeUsers
                                  .sort((a, b) =>
                                    a.lastName > b.lastName ? 1 : -1
                                  )
                                  .map((userItem) => {
                                    if (
                                      month == userItem.month &&
                                      userItem.active == 'true'
                                    ) {
                                      return (
                                        <li style={{ 'margin-left': 30 }}>
                                          <i>
                                            {userItem.firstName +
                                              ' ' +
                                              userItem.lastName +
                                              ' - ' +
                                              this.createDate(userItem.dob) +
                                              ' year'}
                                          </i>
                                        </li>
                                      );
                                    }
                                  })}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                      {/* {this.props.storeUsers
                        .sort((a, b) =>
                          new Date(a.dob) > new Date(b.dob) ? 1 : -1
                        )
                        .map((item) => {
                          if (item.active == 'true') {
                            activeUsers.push(item);
                            this.sortUserBirthday(activeUsers);
                            // const { users } = this.sortUserBirthday(activeUsers);
                            console.log(this.state.filterBirthdayUsers);
                            this.state.filterBirthdayUsers.map((item, key) => {
                              return (
                                <li key={key}>
                                  <td style={{ 'min-width': 200 }}>
                                    <b>
                                      {item.firstName + ' ' + item.lastName}
                                    </b>
                                  </td>
                                  <td>
                                    <b>{this.createDate(item.dob) + ' year'}</b>
                                  </td>
                                </li>
                              );
                            });
                          }
                        })} */}
                      {/* {console.log(activeUsers)} */}
                    </ul>
                  </tr>
                </tbody>
              </table>
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
