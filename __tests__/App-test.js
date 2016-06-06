import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import App from '../modules/App';

jest.unmock("../modules/App");

describe('User signup app', () => {
  var appRendered;

  beforeEach(()=>{
    appRendered = TestUtils.renderIntoDocument(
      <App/>
    );
  });

  it('contains username input', ()=> {
    var usernameInput = TestUtils.findRenderedDOMComponentWithClass(appRendered, "form__username");
    expect(usernameInput).toBeDefined();
  });

  it('contains password input', ()=> {
    var passwordInput = TestUtils.findRenderedDOMComponentWithClass(appRendered, "form__password");
    expect(passwordInput).toBeDefined();
  });

  it("when users submits form data is sent", ()=>{
    // find form
    var formSignup = TestUtils.findRenderedDOMComponentWithClass(appRendered, "form--signup");
    var e = {
      preventDefault: ()=>{ console.log('RUNNING');}
    };
    var Serialize = jest.fn(()=>{

    });

    spyOn(appRendered, "handleUserSignup").and.callThrough();
    spyOn(appRendered, "sendSignupRequest");
    spyOn(appRendered, "serializeFormData");
    spyOn(e, "preventDefault");
    // spyOn(appRendered, "Serialize");

    appRendered.handleUserSignup(e);
    // ensure method is called with data serialized
    expect(e.preventDefault).toBeCalled();
    // expect(Serialize).toBeCalled();
    expect(appRendered.serializeFormData).toBeCalled();
    expect(appRendered.sendSignupRequest).toBeCalled();
  });

  it("on successful post sets state for username", ()=>{
    var responseData = {
      _id: "2o3uiksjefokjas",
      username: "professor xavier",
      password: "jeangrey1"
    }

    spyOn(appRendered, "handlePostSuccess").and.callThrough();
    spyOn(appRendered, "setState");

    appRendered.handlePostSuccess(responseData);

    expect(appRendered.setState).toBeCalledWith({
      username: responseData.username
    });
  });
});
