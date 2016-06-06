import React from 'react'
import $ from 'jquery'
import Serialize from 'form-serialize'

export default React.createClass({
  getDefaultProps(){
    return {
      URLUsers: 'http://tiny-tiny.herokuapp.com/collections/javanderslice-9point1-users1',
      URLMessages: 'http://tiny-tiny.herokuapp.com/collections/javanderslice-9point1-messages3'
    }
  },
  getInitialState(){
    return {
      username: '',
      messages: [],
      users: [],
      flattened: []
    }
  },
  getMessagesAJAX(){
    $.get({
      url: this.props.URLMessages,
      success: this.onSuccessfulGetMessages
    })
  },
  getCurrentUserAJAX(){
    $.get({
      url: `${this.props.URLUsers}/${this.props.params._id}`,
      success: this.onSuccessfulGetUserInfo
    });
  },
  getAllUsersAJAX(){
    $.get({
      url: this.props.URLUsers,
      success: this.onSuccessfulGetAllUsers
    });
  },
  onSuccessfulGetAllUsers(resp){
    this.setState({
      users: resp
    });
  },
  onSuccessfulGetUserInfo(resp){
    this.setState({
      username: resp.username
    })
  },
  onSuccessfulGetMessages(resp){
    this.setState({
      messages: resp
    })
  },
  componentWillMount(){
    this.getMessagesAJAX();
    this.getCurrentUserAJAX();
    this.getAllUsersAJAX();
  },
  onSuccessfulPostMessage(resp){
    this.getMessagesAJAX();
  },
  serializeMessageForm(){
    return Serialize(this.refs.messageForm, {hash: true});
  },
  handleFormSubmit(e){
    e.preventDefault();

    $.post({
      url: this.props.URLMessages,
      success: this.onSuccessfulPostMessage,
      data: this.serializeMessageForm()
    })
  },
  render() {
    return (
      <section>
        <h2>Welcome to the chatroom, {this.state.username}</h2>
        <form ref="messageForm" method="POST" action="#sendMessage" onSubmit={this.handleFormSubmit}>
          <input type="text" name="text" />
          <input type="hidden" name="user_id" value={this.props.params._id} />
          <input type="hidden" name="username" value={this.state.username} />
          <input type="submit" value="send" />
        </form>
        <ul>
          { this.state.messages.map((message, i)=>{
              return <li key={i}>
                <span className="username"> {message.username} </span>
                <span>{ message.text }</span>
              </li>
            } )
          }
        </ul>
      </section>
    )
  }
});
