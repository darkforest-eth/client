import React from 'react';

export class DFErrorBoundary extends React.Component<unknown, { hasError: boolean }> {
  constructor(props: unknown) {
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
      return <div>There was an error rendering this ui</div>;
    }

    return this.props.children;
  }
}
