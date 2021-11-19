import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      alphabet: '',
    };
  }

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
      ? element.name.toLowerCase().includes(searchInput.toLowerCase())
      : false;

  filterItems = (itemList) => {
    let result = [];
    const { searchInput, alphabet } = this.state;

    if (itemList && (searchInput || alphabet)) {
      result = itemList.filter(
        (element) =>
          element.name.charAt(0).toLowerCase() === alphabet.toLowerCase() ||
          this.elementContainsSearchString(searchInput, element)
      );
    } else {
      result = itemList || [];
    }

    result = result.sort().map((item, index) => (
      <li className='brand-item' key={index}>
        <a href='#'>{item.name}</a>
      </li>
    ));

    /*const groups = brands.reduce((groups, newbrand) => {
        const letterKey = newbrand.name.charAt(0).toLowerCase();
        (groups[letterKey] || (groups[letterKey] = [])).push(newbrand);
          return groups;
        }, {});

        Object.entries(groups).sort().map(([letterKey, brands]) => {
          console.log('KEY', letterKey);
          brands.map(brand => console.log('\tbrand', brand));
        });*/

    return result;
  };

  // All Brand click function

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
    const all_brands = [
      {
        name: 'Talika',
      },
      {
        name: 'La Sultane De Saba',
      },
      {
        name: 'Serge Louise Alvarez',
      },
      {
        name: 'Dueto',
      },
    ];
    let brands = all_brands;

    // Initialize the Sort data alphabetically

    //if (brands) brands.sort(this.dynamicSort("name"));

    if (brands) len = brands.length;

    var letters = '',
      groups = {};
    for (var i = 0, len; i < len; i++) {
      var letterKey = brands[i].name.charAt(0).toLowerCase(); // get the first letter
      if (letters.indexOf(letterKey) === -1) {
        letters += letterKey;
        groups[letterKey] = [brands[i]];
      } else {
        groups[letterKey].push([brands[i]]);
      }
    }

    console.log(letters);

    const filteredList = this.filterItems(brands);
    return (
      <div className='container no-padding'>
        <div className='row'>
          <div className='widget-title page-title col-md-12 p-l-0'>
            <h2 className='pull-left'>
              Brands
              <span className='toolbar-number'>
                ( Showing {filteredList.length} results ){' '}
              </span>
            </h2>
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
        </div>
        <div>
          <p>
            <strong>
              This is the first character of each word in the data
            </strong>
          </p>{' '}
          <strong>{letters}</strong>
          <p>Need to put this into filterItems function</p>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
