import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Home from '../pages';

describe('useCreateDiv', () => {
  it('should be able create a new div when fire event in useCreateDiv Hook  ', async () => {
    const { getByTestId, getByPlaceholderText, queryByPlaceholderText } =
      render(<Home />);

    const makeDiv = getByTestId('test');

    expect(queryByPlaceholderText('paint')).toBe(null);
    await userEvent.click(makeDiv);

    expect(getByPlaceholderText('paint')).toBeInTheDocument();
  });

  it('should be able to undo a element', async () => {
    const { getByTestId, getByText, queryByPlaceholderText } = render(<Home />);
    const makeDiv = getByTestId('test');
    const undo = getByText('undo');

    await userEvent.click(makeDiv);

    await userEvent.click(undo);

    expect(queryByPlaceholderText('paint')).not.toBeInTheDocument();
  });

  it('should be able to redo a element', async () => {
    const { getByTestId, getByText, queryByPlaceholderText } = render(<Home />);
    const makeDiv = getByTestId('test');
    const undo = getByText('undo');
    const redo = getByText('redo');

    await userEvent.click(makeDiv);
    await userEvent.click(undo);

    expect(queryByPlaceholderText('paint')).not.toBeInTheDocument();

    await userEvent.click(redo);

    expect(queryByPlaceholderText('paint')).toBeInTheDocument();
  });
});
