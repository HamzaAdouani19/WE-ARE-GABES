import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  title: string;
  message: string;
  retryLabel: string;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('WE ARE GABÈS render error:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div
        role="alert"
        className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#060b14] p-8 text-center text-stone-100"
      >
        <p className="font-display text-2xl font-semibold">{this.props.title}</p>
        <p className="max-w-md text-sm text-stone-300">{this.props.message}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg bg-[#1f7d72] px-4 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-[#5eead4]"
        >
          {this.props.retryLabel}
        </button>
      </div>
    );
  }
}
