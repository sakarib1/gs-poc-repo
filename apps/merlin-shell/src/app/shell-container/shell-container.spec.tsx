import { render } from '@testing-library/react';

import ShellContainer from './shell-container';

describe('ShellContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShellContainer />);
    expect(baseElement).toBeTruthy();
  });
});
