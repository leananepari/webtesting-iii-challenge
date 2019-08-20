// Test away!
import React from 'react';
import renderer from 'react-test-renderer'; // 1: install this npm module as a dev dependency
import { render, fireEvent, cleanup } from '@testing-library/react';
import Controls from './Controls';

afterEach(cleanup);

describe('<Controls />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Controls />); // generates a DOM tree
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should not fire lock gate when the gate is open", () => {
    let disabled = true;
    let lockText = 'Lock Gate';
    let closeText = 'Close Gate';
    let toggleLocked = jest.fn(() => disabled ? lockText = 'Lock Gate' : lockText = 'Unlock Gate');
    let toggleClosed = jest.fn(() => disabled = false);

    const lockBtn = render(<button onClick={toggleLocked} >{lockText}</button>);
    const closeBtn = render(<button onClick={toggleClosed} >{closeText}</button>);
    fireEvent.click(lockBtn.getByText(/lock gate/i));
    expect(toggleLocked).toHaveBeenCalled();
    lockBtn.rerender(<button onClick={toggleLocked} >{lockText}</button>);
    expect(lockBtn.getByText(/lock gate/i)).toBeTruthy();

    fireEvent.click(closeBtn.getByText(/close gate/i));
    expect(toggleClosed).toHaveBeenCalled();
    fireEvent.click(lockBtn.getByText(/lock gate/i));
    lockBtn.rerender(<button onClick={toggleLocked} >{lockText}</button>);
    expect(lockBtn.getByText(/unlock gate/i)).toBeTruthy();
  });

  it("should fire 'close gate' when clicked and change text to 'open gate'", () => {
    let text = 'Close Gate';
    const toggleClosed = jest.fn(() => 
      text = 'Open Gate'
    );

    const { getByText, rerender } = render(<button onClick={toggleClosed} >{text}</button>);
    fireEvent.click(getByText(/close gate/i));
    expect(toggleClosed).toHaveBeenCalled();
    rerender(<button onClick={toggleClosed} >{text}</button>);

    expect(getByText(/open gate/i)).toBeTruthy();
  });
  
});
