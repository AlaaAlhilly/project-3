import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import request from 'superagent';
import "./profileHeader.css"
import {updateProfilePic} from '../../actions/profileActions'
const CLOUDINARY_UPLOAD_PRESET = 'clixcvin';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dh7ooikgx/upload';
class ProfileHeader extends Component {
  change_profile_picture =(url)=>{
    const {auth} = this.props
    const {user} = auth
    let user_obj = {
      id:user.id,
      url: url
    }
    this.props.updateProfilePic(user_obj)
  }
  fileSelectedHandler =(event)=>{
    this.setState({
      uploadedFile:event.target.files[0]
    })
    let bt_this = this
    setTimeout(function(){
      bt_this.handleImageUpload(bt_this.state.uploadedFile);
    },1000)
    
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
        this.change_profile_picture(response.body.secure_url)
      }
    });
  }
  
  render() {
    const { profile } = this.props;
    const {auth} = this.props
    const {user} = auth
    console.log(user)
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto text-center">
              {auth.isAuthenticated ? profile.user._id === user.id?(
                <label className="lbli" htmlFor="upl">
                <input id="upl" type="file" onChange={this.fileSelectedHandler} style={{"display":"none"}}/>

                <div className="ctn">
                  <img
                    className="rounded-circle prof"
                    src={profile.user.avatar}
                    alt=""
                  />
                  <div className="overlay">
                    <p className="icon" title="User Profile">
                      <i className="fa fa-user"></i>
                    </p>
                    </div>
                </div>
                </label>
                
              ) : (
                <div className="ctn">
                <img
                  className="rounded-circle prof"
                  src={profile.user.avatar}
                  alt=""
                /></div>
              ) :(
                <div className="ctn">
                <img
                  className="rounded-circle prof"
                  src={profile.user.avatar}
                  alt=""
                /></div>
              )}
                
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}{' '}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
              <p>
                {isEmpty(profile.website) ? null : (
                  <a rel="noopener noreferrer"
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a rel="noopener noreferrer"
                    className="text-white p-2"
                    href={profile.social.twitter}
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a rel="noopener noreferrer"
                    className="text-white p-2"
                    href={profile.social.facebook}
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a rel="noopener noreferrer"
                    className="text-white p-2"
                    href={profile.social.linkedin}
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a rel="noopener noreferrer"
                    className="text-white p-2"
                    href={profile.social.youtube}
                    target="_blank"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a rel="noopener noreferrer"
                    className="text-white p-2"
                    href={profile.social.instagram}
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ProfileHeader.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {updateProfilePic})(
  ProfileHeader
);

