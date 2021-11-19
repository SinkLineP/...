import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Filteremployees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      alphabet: '',
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

  onSearchInputChange = (e) => {
    this.setState({ searchInput: e.target.value });
  };
  onAlphabetClick = (e) => {
    this.setState({ alphabet: e.target.value });
  };
  prepareAlphabets = () => {
    let result = [];
    for (let i = 65; i < 91; i++) {
      result.push(
        <button
          type='button'
          key={i}
          onClick={this.onAlphabetClick}
          value={String.fromCharCode(i)}
        >
          {String.fromCharCode(i)}
        </button>
      );
    }
    return result;
  };
  elementContainsSearchString = (searchInput, element) =>
    searchInput
      ? element.firstName.toLowerCase().includes(searchInput.toLowerCase())
      : false;

  filterItems = (itemList) => {
    let result = [];
    const { searchInput, alphabet } = this.state;

    if (itemList && (searchInput || alphabet)) {
      result = itemList.filter(
        (element) =>
          element.firstName.charAt(0).toLowerCase() ===
            alphabet.toLowerCase() ||
          this.elementContainsSearchString(searchInput, element)
      );
    } else {
      result = itemList || [];
    }

    result = result.sort().map((item, index) => (
      <li className='brand-item' key={index}>
        <p href='#'>{item.firstName}</p>
        <input
          type='radio'
          value={false}
          name={item.id}
          data-id='active'
          defaultChecked={true}
        />
        <label htmlFor='active'>not active</label>
        <br />
        <input type='radio' value={true} name={item.id} data-id='not-active' />
        <label htmlFor='not-active'>active</label>
      </li>
    ));

    return result;
  };

  handleClick = (e) => {
    this.setState({ alphabet: e.target.value });
  };

  dynamicSort(property) {
    let sortOrder = 1;

    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  }

  render() {
    let users = this.props.storeUsers;

    if (users) len = users.length;

    var letters = '',
      groups = {};
    for (var i = 0, len; i < len; i++) {
      var letterKey = users[i].firstName.charAt(0).toLowerCase();
      if (letters.indexOf(letterKey) === -1) {
        letters += letterKey;
        groups[letterKey] = [users[i]];
      } else {
        groups[letterKey].push([users[i]]);
      }
    }

    const filteredList = this.filterItems(users);
    return (
      <div className='container no-padding'>
        <div className='row'>
          <div className='widget-title page-title col-md-12 p-l-0'>
            <input
              type='search'
              onChange={this.onSearchInputChange}
              className='pull-right'
              placeholder='Search by Brand'
            />
          </div>
        </div>
        <div className='row alplhabet-grid'>
          <button onClick={this.handleClick} className='btn-all-celebrities'>
            {' '}
            All Brands{' '}
          </button>
          {this.prepareAlphabets()}
        </div>

        <div className='row brand-grid'>
          <ul className='no-padding brand-items col-md-12'>{filteredList}</ul>
          <h3>{filteredList.length == 0 ? <p>No Employees</p> : ''}</h3>
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
)(Filteremployees);
