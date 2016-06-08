import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Signup from '../modules/Signup';

jest.unmock("../modules/Signup");
jest.unmock("validator");

describe('User signup app', () => {
  var signupRendered,
      e

  beforeEach(()=>{
    signupRendered = TestUtils.renderIntoDocument(
      <Signup/>
    );

    e = {
      preventDefault: ()=>{ }
    };
  });

  it('contains username input', ()=> {
    var usernameInput = TestUtils.findRenderedDOMComponentWithClass(signupRendered, "form__username");
    expect(usernameInput).toBeDefined();
  });

  describe("tests input validity", ()=>{
    beforeEach(()=>{
      spyOn(signupRendered, "checkInputValidity").and.callThrough();
    });

    describe("username input is valid", ()=>{
      var stubbedFormData = {
          username: 'ted mosby'
      }

      it("should set state as true", ()=>{
        signupRendered.checkInputValidity(stubbedFormData);
        expect(signupRendered.state.isUsernameValid).toBe(true);
      });
    });

    describe("username input is invalid", ()=>{
      var stubbedFormData = {
          username: 'te'
      }

      it("should set state as false", ()=>{
        signupRendered.checkInputValidity(stubbedFormData);
        expect(signupRendered.state.isUsernameValid).toBe(false);
      });
    });
  });

  describe("when signup form is submitted", ()=>{

    beforeEach(()=>{
      spyOn(e, "preventDefault");
      spyOn(signupRendered, "handleUserSignup").and.callThrough();
      spyOn(signupRendered, "sendSignupRequest");
      spyOn(signupRendered, "serializeFormData");
      spyOn(signupRendered, "checkInputValidity");

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

  describe("When a user signs up with no information", ()=>{
    beforeEach(()=>{
      spyOn(e, "preventDefault");
      spyOn(signupRendered, "handleUserSignup").and.callThrough();
      spyOn(signupRendered, "sendSignupRequest");
      spyOn(signupRendered, "serializeFormData");
      spyOn(signupRendered, "checkInputValidity");
      signupRendered.handleUserSignup(e);
    });

    it("should provide error text for username", ()=>{
      var errorElement = TestUtils.findRenderedDOMComponentWithClass(signupRendered, "username__error");
      signupRendered.setState({
        isUsernameValid: false
      });
      expect(errorElement.textContent).toBe("Username must be 3 - 100 characters");
    });

    it("should not submit", ()=>{

    });
  });
});
