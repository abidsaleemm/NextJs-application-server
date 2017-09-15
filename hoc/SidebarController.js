import React, { Component } from 'react';

function SidebarContainer(WrappedComponent) {
    // returns another component ...
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                shouldShowToggle: false,
                isOpen: false,
            }
        }

        // Listen for mouse movements
        componentDidMount() {
            document.body.addEventListener('mousemove', this.handleMousemove);
        }

        // Clean up when finished
        componentWillUnmount() {
            document.body.removeEventListener('mousemove', this.handleMousemove)
        }

        // Set our Tab state to true when the cursor is near the left edge of body
        handleMousemove = (event) => {
            const triggerArea = this.state.isOpen ?
                this.props.sidebarWidth + 30 : 100;
            this.setState({
                shouldShowToggle: event.x < triggerArea
            })
        }

        // Toggle the sidebar open and closed
        handleToggle = () => {
            this.setState({
                isOpen: !this.state.isOpen
            })
        }

        render() {
            // ... and renders the wrapped component!
            // We pass through any additional props and container state
            return(
                <WrappedComponent  {...{...this.state, ...this.props}}
                    handleToggle={this.handleToggle}
                />
            );
        }
    };
}

export default SidebarContainer