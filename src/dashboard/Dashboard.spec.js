// Test away
import React from 'react';
import renderer from 'react-test-renderer'; // 1: install this npm module as a dev dependency
import { render, fireEvent} from '@testing-library/react';
import Dashboard from './Dashboard';

describe('<Dashboard />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Dashboard />); // generates a DOM tree

    // snapshots are a JSON representation of the DOM tree
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('shows display and controls', () => {
    const { getByText, queryByText } = render(<Dashboard />);
    
    expect(getByText(/unlocked/i)).toBeTruthy();
    expect(getByText(/open/i)).toBeTruthy();
    expect(getByText(/lock gate/i)).toBeTruthy();
    expect(getByText(/close gate/i)).toBeTruthy();
    expect(queryByText(/unloccked/i)).toBeFalsy();
  })
});



// describe('asyncFunc', () => {
//   it('eventually resolves to success', () => {
//     // let resolvedValue = null;
//     // asyncFunc().then(res => {
//       const expected = 'Success!';
//       // let resolvedValue = res;
//       return expect(asyncFunc()).resolves.toBe(expected);
//     // })
//   });
// })

// describe("speak", () => {
//   it('Should pass "bark" into speak', () => {
//     const { getByText, queryByText } = render(<App />);

//     expect(queryByText(/bark/i)).toBeFalsy();

//     fireEvent.click(getByText(/speak/i));

//     expect(queryByText(/bark/i)).toBeTruthy();
//   })
// })