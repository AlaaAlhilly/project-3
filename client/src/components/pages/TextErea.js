import React from "react"
export default class TextErea extends React.Component {
    constructor() {
      super();
      this.state = {value: ""};
    }
  
    update = (e) => {
      this.setState({value: e.target.value});
    }
  
    render() {
      return (
        <div>
        <textarea value={this.state.value} className="form-control" placeholder="write a comment..." rows="3" onChange={this.update}>
                                 
        </textarea>
        <br></br>
        <button type="submit" className="btn btn-info pull-right" onClick={()=>this.props.onClick(this.props.snippet_id,this.state.value)}>Post</button>
        </div>
      );
    }
  }