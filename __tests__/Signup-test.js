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

  describe("when signup form is submitted", ()=>{
    var e;
    
    beforeEach(()=>{
      e = {
        preventDefault: ()=>{ }
      };

      spyOn(e, "preventDefault");
      spyOn(signupRendered, "handleUserSignup").and.callThrough();
      spyOn(signupRendered, "sendSignupRequest");
      spyOn(signupRendered, "serializeFormData");

      signupRendered.handleUserSignup(e);
    });

    it("prevents default behavior", ()=>{
      expect(e.preventDefault).toBeCalled();
    });

    it("calls to serialize form data", ()=>{
      expect(signupRendered.serializeFormData).toBeCalled();
    });

    it("calls send signup request", ()=>{
      expect(signupRendered.sendSignupRequest).toBeCalled();
    });
  });
});
