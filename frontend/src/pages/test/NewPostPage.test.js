import { render, screen, fireEvent } from '@testing-library/react';
import NewPostPage from '../NewPostPage';
import { useAuth0 } from "@auth0/auth0-react";

// Mock the useAuth0 hook
jest.mock('@auth0/auth0-react');

describe('NewPostPage', () => {
  test('renders correctly for authenticated user', () => {
    // Mocking the `useAuth0` hook as if the user is logged in
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: { email_verified: true }
    });

    render(<NewPostPage />);

    // Check if the "Create a New Post" title is rendered
    expect(screen.getByText(/Create a New Post/i)).toBeInTheDocument();
    // Check if the "Submit" button is in the document
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  test('renders warning message for unauthenticated user', () => {
    // Mocking the `useAuth0` hook as if the user is not authenticated
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user: null
    });

    render(<NewPostPage />);

    // Check if the warning message is rendered for unauthenticated users
    expect(screen.getByText(/You must be logged in with a verified email to access this page/i)).toBeInTheDocument();
  });
});
