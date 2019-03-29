import React from 'react'
import { Pre, LineNo } from './styles'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import './style.css'
import Moment from 'react-moment';
import uniqid from 'uniqid'
import TextErea from './TextErea'
import API from '../../utils/API';
import LikeButton from './LikeButton';
let user_obj = JSON.parse(localStorage.getItem('okta-token-storage'))
function getLikes(likes,s_id){
    for(let i=0;i<likes.length;i++){
        if(likes[i].author_id === user_obj.idToken.clientId){
            return true
        }
    }
    return false
}
function Snippets(props) {
    let snippet_array = []
    props.snippets.forEach(snippet=>{
    let comment_array = []
    let likeButton=[]
    if( getLikes(snippet.likes,snippet._id)){
        likeButton.push(<LikeButton getLikes={getLikes} clsName="btn btn-primary" snippet_id={snippet._id} likeThisSnippet={props.likeThisSnippet} key={uniqid()}/>)
    }else{

        likeButton.push(<LikeButton clsName="btn btn-secondary" snippet_id={snippet._id} likeThisSnippet={props.likeThisSnippet} key={uniqid()}/>)
    }
    
    snippet.comments.forEach(comm =>{
        comment_array.push(
            
            <li key={uniqid()} className="media pull-left">
            <a href="/" className="pull-left" style={{"marginRight":"15px"}}>
                <img src={comm.auth_pic} alt="" className="img-circle"/>
            </a>
            <div className="media-body">
            <strong className="text-success pull-left">{comm.author_name}</strong>

                <span className="text-muted pull-right" style={{"float":"right"}}>
                    <small className="text-muted">
                    <Moment format="D, MMM YYYY, hh:mm a" withTitle>
                            {snippet.date}
                    </Moment>
                    </small>
                </span>
                <p>
                    {comm.body}
                </p>
            </div>
        </li>
        )
    })
    snippet_array.push(
    <div key={uniqid()} className="row">
    <div className="col-md-8">
        <article className="media content-section">
            <div className="media-body">
                <div className="article-metadata">
                    <img src={snippet.author.pic} alt={"alaa"} className="rounded-circle post_prof_img" />
                    <a className="mr-2" href="/">{snippet.author.name}</a>
                    <small className="text-muted ml-2" style={{"float":"right"}}>
                    <Moment format="D, MMM YYYY, hh:mm a" withTitle>
                            {snippet.date}
                    </Moment>
                    </small>
                </div>
                <h2><a className="article-title" href="/">{snippet.title}</a></h2>
                <p className="desc">
                    {snippet.desc}
                </p>
                <Highlight {...defaultProps} theme={theme} code={snippet.content} language="jsx">
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <Pre className={className} style={style}>
                            {tokens.map((line, i) => (
                                <div {...getLineProps({ line, key: i })}>
                                    <LineNo>{i + 1}</LineNo>
                                    {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                                </div>
                            ))}
                        </Pre>
                    )}
                </Highlight>
                <small className="text-muted md-3">written with : {snippet.lang}</small>
                <small className="text-muted md-3" style={{"float":"right"}}>This snippet helped {snippet.likes.length} developers</small>
                <hr></hr>
                <div className="text-center">
                    {
                        likeButton
                    }
                    <button style={{"marginLeft":"5px"}}  type="button" className="btn btn-secondary sh-comm">Comment</button>
                    

                </div>
                <hr></hr>
                <div  className="row bootstrap snippets comm" style={{"display":"none"}}>
                <div className="col-md-12 col-md-offset-2 col-sm-12">
                    <div className="comment-wrapper">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                Comments
                            </div>
                            <div className="panel-body">
                                <TextErea snippet_id={snippet._id} onClick={props.commentForThisSnippet}/>
                                    <div className="clearfix"></div>
                                <hr></hr>
                                <ul className="media-list">
                                    {comment_array}
                                    
                                </ul>
                            </div>
                        </div>
                    </div>

            </div>
        </div>
            </div>
            
        </article>
    </div>
    </div>
    )
        
    })
    return (
        <div className="container">
            
             {snippet_array}
            
        </div>
    )
}
export default Snippets