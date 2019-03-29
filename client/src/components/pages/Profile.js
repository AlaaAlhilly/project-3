import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import InNavbar from '../layout/InNavbar';
import OutNavbar from '../layout/OutNavbar';
import request from 'superagent';
import './styles'
import API from '../../utils/API'
const CLOUDINARY_UPLOAD_PRESET = 'clixcvin';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dh7ooikgx/upload';

export default withAuth(
  class Profile extends Component {
    constructor(props){
      super(props)
      this.state = { 
        authenticated: null,
        uploadedFile: null,
        uploadedFileCloudinaryUrl: '',
        defaultProfilePic:"https://res.cloudinary.com/dh7ooikgx/image/upload/v1553397211/favicon_rklfor.ico",
        first_name:'',
        last_name:'',
        phone:'',
        user:null
      };
    }

    fileSelectedHandler =(event)=>{
      this.setState({
        uploadedFile:event.target.files[0]
      })
      let bt_this = this
      setTimeout(function(){
        bt_this.handleImageUpload(bt_this.state.uploadedFile);
      },2000)
      
    }
    handleImageUpload(file) {
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                       .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                       .field('file', file);
  
      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }
  
        if (response.body.secure_url !== '') {
          this.setState({
            uploadedFileCloudinaryUrl: response.body.secure_url
          });
        }
      });
    }
    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        let user_obj = JSON.parse(localStorage.getItem('okta-token-storage'))

      API.getUser(user_obj.idToken.clientId).then(
        res => {this.setState({user:res.data});}
      )
        this.setState({ authenticated });
      }
    };

    async componentDidMount() {
      this.checkAuthentication();
      
      
      console.log()
    }
    async componentDidUpdate() {
      this.checkAuthentication();
    }

    login = async () => {
      this.props.auth.login('/');
    };

    logout = async () => {
      this.props.auth.logout('/');
    };
    
    render() {
      if (this.state.authenticated === null) return null;
      

      const mainContent = this.state.authenticated ? (

        <div className="container">
          <InNavbar logout={this.logout} />
          <div className=" bootstrap snippet">
            <div className="row">
              <div className="col-sm-10"><h1>{this.state.user?this.state.user.name:""}</h1></div>
              <div className="col-sm-2"><a href="/users" className="pull-right">
              <img alt="prof"  className="img-circle img-responsive" src="http://www.gravatar.com/avatar/28fd20ccec6865e2d5f0e1f4446eb7bf?s=100" /></a></div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <div className="text-center">
                <label htmlFor="upl">
                <div className="ctn">
                  <img  alt="prof"  className="rounded-circle article-img" src={this.state.user?this.state.user.pic:this.state.uploadedFileCloudinaryUrl?this.state.uploadedFileCloudinaryUrl:this.state.defaultProfilePic} />
                  <div className="overlay">
                    <p className="icon" title="User Profile">
                      <i className="fa fa-user"></i>
                    </p>
                    </div>
                </div>
                </label>
                <input id="upl" type="file" onChange={this.fileSelectedHandler} style={{"display":"none"}}/>
                </div>
                <br></br>
                <ul className="list-group">
                  <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x"></i></li>
                  <li className="list-group-item text-left"><span className="pull-left"><strong>Likes</strong></span> <span style={{"float":"right"}}>{this.state.user?this.state.user.likes.length:""}</span></li>
                  <li className="list-group-item text-left"><span className="pull-left"><strong>Snippets</strong></span> <span style={{"float":"right"}}>{this.state.user?this.state.user.snippets.length:""}</span></li>
                </ul>
              </div>
              <form className="form" action="##" method="post" id="registrationForm">
                <div className="form-group">
                    <label htmlFor="first_name"><h4>First name</h4></label>
                    <input type="text" className="form-control" name="first_name" id="first_name" placeholder="first name" title="enter your first name if any." />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name"><h4>Last name</h4></label>
                    <input type="text" className="form-control" name="last_name" id="last_name" placeholder="last name" title="enter your last name if any." />
                </div>

                <div className="form-group">

                    <label htmlFor="phone"><h4>Phone</h4></label>
                    <input type="text" className="form-control" name="phone" id="phone" placeholder="enter phone" title="enter your phone number if any." />
                </div>

                <div className="form-group">
                      <button className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
                      <button className="btn btn-lg" type="reset"><i className="glyphicon glyphicon-repeat"></i> Reset</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
          <div>
            <OutNavbar />
            <p className="lead">
              If you are a staff member, please get your credentials from your
              supervisor
          </p>
            <button className="btn btn-dark btn-lg" onClick={this.login}>
              Login
          </button>
          
          </div>
        );
      return (
        <div>{mainContent}</div>
      );
    }
  }
);