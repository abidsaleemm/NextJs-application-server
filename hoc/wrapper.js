import React, { Component } from 'react';
import Nav from '../components/nav';
import Styles from '../components/styles';
import Loader from '../containers/loader'; // TODO Requires a store. Should probably have a check for this.

const Wrapper = (WrappedComponent, { nav = true, loader = true } = {}) => props =>
    <div className="root">
        <style jsx global>
            {`
            .root {
                display: flex;
                flex-direction: column;
                width: 100vw;
                height: 100vh;
            }
        `}
        </style>
        <Styles {...props} />
        {nav ? <Nav {...props} /> : null}
        {loader ? <Loader {...props} /> : null}
        <WrappedComponent {...props} />
    </div>

export default (WrappedComponent, ...params) => class extends Component {
    static getInitialProps = WrappedComponent.getInitialProps;

    constructor(props) {
        super(props);

        // TODO I believe this should not go under render method, but not sure
        this.Enhanced = Wrapper(WrappedComponent, ...params);
    }

    render() {
        const { Enhanced, props } = this;
        return <Enhanced {...props} />;
    }
};