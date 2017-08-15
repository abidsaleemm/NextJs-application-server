import React from 'react';
import Styles from '../hoc/styles';
import LoginPage from '../components/loginPage';

const EntryPage = class extends React.Component {
    static getInitialProps({ req: { session } }) {
        let props = {};
        if (session.sessionFlash !== undefined) {
            props = { ...session.sessionFlash };
            session.sessionFlash = {}
        }
        return props;
    };

    render() {
        const { props = {} } = this;
        return (
            <LoginPage {...props} />
        );
    }
}

export default Styles(LoginPage);