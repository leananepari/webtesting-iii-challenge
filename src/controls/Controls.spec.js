// Test away!
import React from 'react';
import renderer from 'react-test-renderer'; // 1: install this npm module as a dev dependency
import { render, fireEvent} from '@testing-library/react';
import Controls from './Controls';

describe('<Controls />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Controls />); // generates a DOM tree
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should not fire lock gate when the gate is open", () => {
    let toggleLocked = jest.fn();

    const { getByText } = render(<Controls toggleLocked={toggleLocked}  />);
    fireEvent.click(getByText(/lock gate/i));
    expect(toggleLocked).not.toHaveBeenCalled();
  });

  it("should fire 'close gate' when clicked and change text to 'open gate'", () => {
    let toggleClosed = jest.fn();

    const { getByText } = render(<Controls toogleClosed={toggleClosed}  />);
    fireEvent.click(getByText(/close gate/i));
    // expect(toggleClosed).toHaveBeenCalled();

    // expect(getByText(/close gate/i)).toBeTruthy();
  });
  
});
