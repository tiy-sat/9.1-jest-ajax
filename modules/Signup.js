import React from 'react'
import $ from 'jquery'
import Serialize from 'form-serialize'
import { Router, browserHistory } from "react-router"

export default React.createClass({
  getInitialState(){
    return {
      username: ''
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
  handleUserSignup(e){
    e.preventDefault();
    var formData = this.serializeFormData(this.refs["form--signup"])
    this.sendSignupRequest(formData);
  },
  render() {
    return (
      <section>
        <h2 ref="username"> {this.state.username ? this.state.username : "not signed in"} </h2>
        <form method="POST" action="#signup" onSubmit={this.handleUserSignup} ref="form--signup" className="form--signup">
          <input className="form__username" type="text" name="username" placeholder="username" />
          <input className="form__password" type="text" name="password" placeholder="password" />
          <input type="submit" value="signup"/>
        </form>
      </section>
    )
  }
});
