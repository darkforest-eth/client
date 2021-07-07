import React from 'react';
import styled from 'styled-components';
import { Red } from '../Components/Text';

interface GenericErrorBoundaryProps {
  errorMessage: string;
}

export class GenericErrorBoundary extends React.Component<
  GenericErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: GenericErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, _errorInfo: React.ErrorInfo) {
    console.error(`ui rendering error`);
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryContent>
          <Red>{this.props.errorMessage}</Red>
        </ErrorBoundaryContent>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundaryContent = styled.div`
  padding: 8px;
  max-width: 350px;
`;
