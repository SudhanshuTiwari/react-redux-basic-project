import React, { Component } from "react";
import { connect } from "react-redux";
import { addArticle, getData } from "../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    addArticle: article => dispatch(addArticle(article)),
    getData: (searchText, resourceType) => dispatch(getData(searchText, resourceType))
  };
}

class ConnectedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      resourceType: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInsuranceNameChange = this.handleInsuranceNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleInsuranceNameChange(event) {
    this.setState({ resourceType: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, resourceType } = this.state;
    // const forbiddenWords = ['spam', 'money'];
    // const foundWord = forbiddenWords.filter(word => title.includes(word) )
    // if (foundWord) {
    //   return this.props.titleForbidden();
    // }
    // this.props.addArticle({ title });
    this.props.getData(title, resourceType);
    // this.setState({ title: "" });
  }

  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          {/* <label htmlFor="title">Type to search </label> */}
          <input
            type="text"
            id="title"
            placeholder="Type here"
            value={title}
            onChange={this.handleChange}
          />
          <span className="separator" style={{ "margin": "0 5px"}}></span>
          <label htmlFor="title">Select a resource : </label>
          <span>
            <select
                      id="resource-type"
                      className="modal-select-dropdown"
                      // value={}
                      onChange={this.handleInsuranceNameChange}
                    >
                      <option value="">Select resource</option>
                      <option value='hackernews'>Hacker News</option>
                      <option value='wiki'>Wiki</option>
                      
            </select>
          </span>
          <span className="separator" style={{ "margin": "0 50px"}}></span>
          <button type="submit">Search  </button>
        </div>
       
      </form>
    );
  }
}

const Form = connect(
  null,
  mapDispatchToProps
)(ConnectedForm);

export default Form;