import { render, screen } from '@testing-library/react';
import App from './App';

test('renders project list', () => {
  render(<App />);
  const linkElement = screen.getByText(/Project list/i);
  expect(linkElement).toBeInTheDocument();
});
