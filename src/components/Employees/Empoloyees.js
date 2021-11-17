import React, { Component, createRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './styles/Employees.scss';
class Employees extends Component {
  constructor(props) {
    super(props);
    this.userFullName = createRef();
    this.colorFullName = [];
    this.state = {
      usersSort: [],
    };
  }

  componentDidMount = () => {
    const baseUrl =
      'https://yalantis-react-school-api.yalantis.com/api/task0/users';

    axios.get(baseUrl).then((response) => {
      response.data.map((item) => {
        this.props.onAddUsers(item);
      });
    });
  };

  // НЕ УДАЛЯТЬ!!!!
  // onChangeHandler = (e) => {
  //   e.preventDefault();
  //   const { value } = e.target;
  //   const userName = this.props.storeUsers;
  //   const sortName = userName.filter(
  //     (user) => user.firstName[0] == value.toUpperCase()
  //   );
  //   console.log(sortName);
  // };

  onChangeHandler = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const userName = this.props.storeUsers;
    const sortName = userName.filter(
      (user) => user.firstName[0] == value.toUpperCase()
    );
    console.log(sortName);
    if (sortName.length != 0) {
      console.log('array not empty');
      this.setState({
        usersSort: sortName,
      });
    } else {
      this.setState({
        usersSort: [
          {
            firstName: 'No Employees',
          },
        ],
      });
    }
  };

  // changeColorName = (e) => {
  //   // e.preventDefault();
  //   const { value } = e.target;
  //   if (value == 'true') {
  //     console.log('it`s true button');
  //     console.log((this.userFullName.style.color = 'red'));
  //   } else if (value == 'false') {
  //     console.log('it`s false button');
  //   }
  // };

  changeColorName = (key) => {
    const contentStyle = this.colorFullName[key].style;
    contentStyle.color === 'black'
      ? (contentStyle.color = 'blue')
      : (contentStyle.color = 'black');
  };

  render() {
    return (
      <div>
        <p>Employess</p>
        <>
          <div>
            <table>
              <thead>
                <tr>
                  {this.props.storeAlphabet.map((item) => (
                    <>
                      <th>
                        <button
                          key={item.id}
                          onClick={this.onChangeHandler.bind(this)}
                          value={item}
                        >
                          {item}
                        </button>
                      </th>
                    </>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.usersSort.map((item, key) => {
                  // console.log(item);
                  if (item.firstName != 'No Employees') {
                    return (
                      <>
                        <tr key={key}>
                          <td>
                            <div>
                              <label
                                name={item.id}
                                ref={(ref) => (this.colorFullName[key] = ref)}
                                style={{ color: 'black' }}
                                htmlFor='not-active'
                              >
                                {item.firstName + ' ' + item.lastName}
                              </label>
                              <br />
                              <input
                                key={key}
                                type='radio'
                                data-id='not-active'
                                name={item.id}
                                value={false}
                                defaultChecked={true}
                                onChange={() => this.changeColorName(key)}
                              />
                              <label htmlFor='not-active'>not active</label>
                            </div>
                            <div>
                              <input
                                key={key}
                                type='radio'
                                data-id='active'
                                name={item.id}
                                value={true}
                                onChange={() => this.changeColorName(key)}
                              />
                              <label htmlFor='active'>active</label>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <tr>
                          <td>{item.firstName}</td>
                        </tr>
                      </>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    storeAlphabet: state.alphabet,
    storeUsers: state.users,
  }),
  (dispatch) => ({
    onAddUsers: (addUsers) => {
      dispatch({ type: 'ADD_USERS', payload: addUsers });
    },
  })
)(Employees);
