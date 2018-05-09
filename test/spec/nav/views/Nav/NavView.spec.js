
import { expect, sinon } from '../../../../support/TestUtils';
import NavView from '../../../../../src/nav/views/Nav/NavView';
import React from 'react';
import { shallow } from 'enzyme';

describe('NavView unit tests', () => {

  it('NavView optional params', () => {
    const wrapper = shallow(<NavView />);
    expect(wrapper.text()).to.eql('Time');
  });

  it('onMount callback after mount', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<NavView onMount={spy} />);
    expect(spy).to.be.calledOnce;
  });

});
