import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Splash from '../containers/Select';

/* We should do two things, test integrity of UI
    by snapshot testing and then test
    the functionality of the Select component
    by testing the side effects of Select's helpers */
describe('===Splash Test===', () => {
    const container = shallow(<Splash />);
    it(`should match snapshot`, () => {
        expect(container.html()).toMatchSnapshot();
    })
    it(`should have a welcome card`, () => {
        expect(container.find('#welcome-wrapper').length).toEqual(1);
    })
    it(`should have a get started button`, () => {
        expect(container.find(`#get-started-btn`).text()).toEqual('1');
    })
    it(`get started button should link to /find`, () => {
        expect(container.find('a [href="/find"').length).toEqual(1);
        
    })
})