import React from 'react';
import { shallow } from 'enzyme';
import Select from '../containers/Select';
const initialState = {
    keywords: {
        tip: false,
        gold: false,
        miles: false,
        entry: true,
        nmts: false,
    },
    price: 500,
};

var keywords = Object.keys(initialState.keywords);
describe(`Select UI Test`, () => {
    const container = shallow(<Select />);
    it(`should match snapshot`, () => {
        expect(container.html()).toMatchSnapshot();
    })
})

describe(`Select Keyword Test`, () => {
    const container = shallow(<Select />);
    it(`keyword list renders`, () => {
        expect(container.find('#keyword-list').children().length).toEqual(keywords.length);
    })
    it(`keywords that are initally true should render as toggled`, () => {
        expect(container.find(`button#entry`).prop('class')).toEqual('spin keyword-label rounded py-2 px-2 mr-2 shadow-md w-20 bg-orange-200 hover:shadow-lg')
    })


    keywords.forEach(keyword => {
        const mockCurrentTarget = { id: `${keyword}` }
        const mockEvent = { currentTarget: mockCurrentTarget, preventDefault: () => console.log('preventDefault') };
        it(`${keyword} should be in rendered keyword list`, () => {
            expect(container.find(`#${keyword}`).length).toEqual(3);
        })
        if (keyword !== 'entry') {
            it(`${keyword} that is initally false should render untoggled`, () => {
                expect(container.find(`button#${keyword}`).prop('class')).toEqual('spin keyword-label rounded py-2 px-2 mr-2 shadow-md w-20 bg-gray-100 hover:bg-gray-200 hover:shadow-lg')
            })
        }
        it(`clicking ${keyword} should set ${keyword} to true in state`, () => {

            container.find(`button#${keyword}`).simulate(`click`, mockEvent)
            expect(container.find(`button#${keyword}`)
                .prop(`class`))
                .toEqual(`spin keyword-label rounded py-2 px-2 mr-2 shadow-md w-20 bg-orange-200 hover:shadow-lg`)
        })
    })
    it(`keywords that are initally true should render as toggled`, () => {
        expect(container.find(`button#entry`).prop('class')).toEqual('spin keyword-label rounded py-2 px-2 mr-2 shadow-md w-20 bg-orange-200 hover:shadow-lg')
    })

})

describe(`Select Price Test`, () => {
    const container = shallow(<Select />)
    it(`price input should set price value in state`, () => {
        container.find(`#price-input`).simulate('change', {
            target: {
                value: '123',
            },
        });
        expect(container.find('#price-input').prop('value')).toEqual('123');

    });

})