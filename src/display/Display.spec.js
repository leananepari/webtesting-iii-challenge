// Test away!
import React from 'react';
import renderer from 'react-test-renderer'; // 1: install this npm module as a dev dependency
import { render, fireEvent } from '@testing-library/react';
import Display from './Display';

describe('<Display />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Display />); // generates a DOM tree
    // snapshots are a JSON representation of the DOM tree
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should display "open" when closed is false', () => {
    let closed = false;
    const { getByText, queryByText } = render(<Display closed={closed}/>);
    expect(getByText(/unlocked/i)).toBeTruthy();
    expect(getByText(/open/i)).toBeTruthy();
    expect(queryByText(/closed/i)).toBeFalsy();
  });

  it('should display "closed" when closed is true', () => {
    let closed = true;
    const { getByText, queryByText } = render(<Display closed={closed}/>);
    expect(getByText(/unlocked/i)).toBeTruthy();
    expect(getByText(/closed/i)).toBeTruthy();
    expect(queryByText(/open/i)).toBeFalsy();
  });

  it('should display "unlocked" when locked is false', () => {
    let locked = false;
    const { getByText } = render(<Display locked={locked}/>);
    expect(getByText(/unlocked/i)).toBeTruthy();
  });

  it('should display "locked" when locked is true', () => {
    let locked = true;
    const { getByText } = render(<Display locked={locked}/>);
    expect(getByText(/locked/i)).toBeTruthy();
  });

  it('should have "red-led" class when locked or closed', () => {
    let locked = true;
    let closed = true;
    const {  getByTestId }  = render(<Display closed={closed} locked={locked} />);
    expect(getByTestId('lock').classList.contains('red-led')).toBe(true);
    expect(getByTestId('close').classList.contains('red-led')).toBe(true);
  });

  it('should have "green-led" class when unlocked or open', () => {
    let locked = false;
    let closed = false;
    const {  getByTestId }  = render(<Display closed={closed} locked={locked} />);
    expect(getByTestId('lock').classList.contains('green-led')).toBe(true);
    expect(getByTestId('close').classList.contains('green-led')).toBe(true);
  });
  
});