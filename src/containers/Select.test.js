import React from 'react';
import Select from './Select.js';
import renderer from 'react-test-renderer';

test('Select renders', () => {
    const tree = renderer.create(<Select />).toJSON();
    expect(tree).toMatchSnapshot();
})

