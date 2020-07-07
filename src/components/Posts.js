import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../actions/index";

export class Post extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <> 
      <h2 style={{"display": this.props.articles && this.props.articles.length? "block":"none" }}>Searched Results </h2>
        <ul>
          {this.props.articles.map(el => (
                <li key={el.id}>
                  <span style={{ "width":"500px","margin": "0 20px"}}>
                  <a href={el.url} target="_blank" >{el.title || el.url|| "Not Availanle"}</a>
                
                  </span>
                  <span className="separator" style={{ "margin": "0 20px"}}>|</span>
                  <span>{el.author} </span>
                  <span className="separator" style={{ "width":"20px"}}>| Submission count  -  </span>
                  <span>{el.submission_count} </span>
                </li>
           ))}
      </ul>
 
      </>
     );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.remoteArticles.slice()
  };
}

export default connect(
  mapStateToProps,
  { getData }
)(Post);