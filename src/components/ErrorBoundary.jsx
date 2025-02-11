import React, { Component } from 'react';

class ErrorBoundary extends Component {
 
  state = {
  hasError: false,
  error: null,
  errorInfo: null
}
  

  static getDerivedStateFromError(error) {
  return { hasError: true };
}

componentDidCatch(error, errorInfo) {
  this.setState({
    error,
    errorInfo
  });
}

render() {
  if (this.state.hasError) {
    return (
      <div className="error-boundary">
        <h2>Something went wrong!</h2>
        <p>{this.state.error && this.state.error.toString()}</p>
        <button
          className="refresh-button"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return this.props.children;
}
}

export default ErrorBoundary;