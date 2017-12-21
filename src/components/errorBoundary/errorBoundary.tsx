import * as React from 'react';

interface Props {
    children: any;
}

export default class ErrorBoundary extends React.Component<Props, {errorInfo: any, error: any}> {
    constructor(props: any) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {
                            this.state.error && this.state.error.toString()
                        }
                    <br />
                        {
                            this.state.errorInfo.componentStack
                        }
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}
