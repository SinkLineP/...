import React, { Component } from 'react';
import { connect } from 'react-redux';

class OpinionPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'false',
    };
  }

  // addStyle = (el) => {
  //   console.log(el);
  //   el.style.color = 'blue';
  //   let fullName = el.firstName;
  // };

  handleOnChange = (e) => {
    const { id, firstName, lastName, dob } = this.props.item;
    let element = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      active: e.target.value,
    };
    // console.log(element);
    this.setState({ selectedOption: e.target.value });
    this.props.onChangeUsers(element);
    // this.addStyle(element);
  };

  render() {
    const json = {
      choices: [
        { text: 'not active', value: 'false' },
        { text: 'active', value: 'true' },
      ],
    };

    return (
      <>
        <div>
          <div>
            {json.choices.map((choice, index) => (
              <label key={index}>
                <input
                  type='radio'
                  name={this.props.itemId}
                  value={choice.value}
                  key={index}
                  checked={this.state.selectedOption === choice.value}
                  onChange={(e) => this.handleOnChange(e)}
                />
                {choice.text}
                <br />
              </label>
            ))}
          </div>
        </div>
      </>
    );
  }
}

// const OpinionPoll = ({ itemId, item }) => {
//   const [state, setState] = useState({
//     selectedOption: 'false',
//   });
//   const handleOnChange = (e) => {
//     const { id, firstName, lastName, dob } = item;
//     let element = {
//       id: id,
//       firstName: firstName,
//       lastName: lastName,
//       dob: dob,
//       active: e.target.value,
//     };
//     console.log(element);
//     this.props.onChangeUsers(`{ id: 1, firstName: 'harry' }`);
//     setState({ selectedOption: e.target.value });
//   };

//   const json = {
//     choices: [
//       { text: 'not active', value: 'false' },
//       { text: 'active', value: 'true' },
//     ],
//   };

//   return (
//     <div className='poll'>
//       <div className='pollOption'>
//         {json.choices.map((choice, index) => (
//           <label key={index}>
//             <input
//               type='radio'
//               name={itemId}
//               value={choice.value}
//               key={index}
//               checked={state.selectedOption === choice.value}
//               onChange={(e) => handleOnChange(e)}
//             />
//             {choice.text}
//             <br />
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

export default connect(
  (state) => ({
    storeUsers: state.users,
  }),
  (dispatch) => ({
    onAddUsers: (addUsers) => {
      dispatch({
        type: 'ADD_USERS',
        payload: addUsers,
      });
    },
    onChangeUsers: (changeUsers) => {
      dispatch({
        type: 'UPDATE_USERS',
        payload: changeUsers,
      });
    },
  })
)(OpinionPoll);
