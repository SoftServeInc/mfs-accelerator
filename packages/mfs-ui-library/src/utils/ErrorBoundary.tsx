import React from "react";

export interface ErrorBoundaryConfig {
  onError?: (error: any, errorInfo: any) => any;
  fallback?: any;
}

const defaultConfig: ErrorBoundaryConfig = {
  onError: null,
  fallback: () => <h5>Something went wrong</h5>,
};

const withErrorBoundary = (config: ErrorBoundaryConfig = defaultConfig) => (
  Component
) => {
  class ErrorBoundary extends React.Component {
    state = {
      hasError: false,
    };

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      if (config.onError) {
        config.onError(error, errorInfo);
      }
    }

    render() {
      if (this.state.hasError) {
        return config.fallback ? <config.fallback /> : null;
      }

      return <Component {...this.props} />;
    }
  }

  return ErrorBoundary;
};

export default withErrorBoundary;
