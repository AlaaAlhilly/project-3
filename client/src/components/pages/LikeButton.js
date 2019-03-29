import React, { Component } from 'react'
export default class LikeButton extends Component {
    state={
        clasName:""
    }
    componentDidMount=()=>{
        console.log(this.props.clsName)
        this.setState({clasName:this.props.clsName})
    }
    changeClass=()=>{
        if(this.state.clasName==="btn btn-secondary"){
            this.setState({clasName:"btn btn-primary"})
        }else{
            this.setState({clasName:"btn btn-secondary"})
        }
        this.props.likeThisSnippet(this.props.snippet_id)
    }
  render() {
    return (
        <button style={{"marginRight":"5px"}}  type="button" className={this.state.clasName} onClick={this.changeClass}>Like</button>

    )
  }
}
