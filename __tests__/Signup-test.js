import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Signup from '../modules/Signup';

jest.unmock("../modules/Signup");

describe('User signup app', () => {
  var signupRendered;

  beforeEach(()=>{
    signupRendered = TestUtils.renderIntoDocument(
      <Signup/>
    );
  });

  it('contains username input', ()=> {
    var usernameInput = TestUtils.findRenderedDOMComponentWithClass(signupRendered, "form__username");
    expect(usernameInput).toBeDefined();
  });

  it('contains password input', ()=> {
    var passwordInput = TestUtils.findRenderedDOMComponentWithClass(signupRendered, "form__password");
    expect(passwordInput).toBeDefined();
  });

  it("when users submits form data is sent", ()=>{
    // find form
    var formSignup = TestUtils.findRenderedDOMComponentWithClass(signupRendered, "form--signup");
    var e = {
      preventDefault: ()=>{ console.log('RUNNING');}
    };
    var Serialize = jest.fn(()=>{

    });

    spyOn(signupRendered, "handleUserSignup").and.callThrough();
    spyOn(signupRendered, "sendSignupRequest");
    spyOn(signupRendered, "serializeFormData");
    spyOn(e, "preventDefault");
    // spyOn(signupRendered, "Serialize");

    signupRendered.handleUserSignup(e);
    // ensure method is called with data serialized
    expect(e.preventDefault).toBeCalled();
    // expect(Serialize).toBeCalled();
    expect(signupRendered.serializeFormData).toBeCalled();
    expect(signupRendered.sendSignupRequest).toBeCalled();
  });

  it("on successful post sets state for username", ()=>{
    var responseData = {
      _id: "2o3uiksjefokjas",
      username: "professor xavier",
      password: "jeangrey1"
    }

    spyOn(signupRendered, "handlePostSuccess").and.callThrough();
    spyOn(signupRendered, "setState");

    signupRendered.handlePostSuccess(responseData);

    expect(signupRendered.setState).toBeCalledWith({
      username: responseData.username
    });
  });
});
