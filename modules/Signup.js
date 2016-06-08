import React from 'react'
import { Router, browserHistory } from "react-router"
import $ from 'jquery'
import Serialize from 'form-serialize'
import Validator from 'validator'

export default React.createClass({
  getInitialState(){
    return {
      username: '',
      isUsernameValid: true
    }
  },
  handlePostSuccess(resp){
    browserHistory.push(`/chatroom/${resp._id}`);
  },
  sendSignupRequest(dataToSend){
    $.post({
      url: "https://tiny-tiny.herokuapp.com/collections/javanderslice-9point1-users",
      data: dataToSend,
      success: this.handlePostSuccess
    })
  },
  serializeFormData(form){
    return Serialize(form, {hash: true});
  },
  checkInputValidity(formData){
    this.setState({
      isUsernameValid: Validator.isLength(formData.username, {min: 3, max: 100})
    });
  },
  handleUserSignup(e){
    e.preventDefault();
    var formData = this.serializeFormData(this.refs["form--signup"])
    this.sendSignupRequest(formData);
    this.checkInputValidity(formData);
  },
  render() {
    return (
      <section>
        <h2 ref="username"> {this.state.username ? this.state.username : "not signed in"} </h2>
        <form method="POST" action="#signup" onSubmit={this.handleUserSignup} ref="form--signup" className="form--signup">
          <h3 className="username__error">
            { this.state.isUsernameValid ? '' : 'Username must be 3 - 100 characters' }
          </h3>
          <input className="form__username" type="text" name="username" placeholder="username" ref="form__username"/>
          <input type="submit" value="signup"/>
        </form>
      </section>
    )
  }
});
