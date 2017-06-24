import React from 'react'
import Link from 'next/link'

import io from 'socket.io-client';
import ProjectList from '../components/projectList';

export default class extends React.Component {
    static getInitialProps = ({ req }) => ({ projects: [] });

    constructor(props) {
        super(props);
        this.socket = io('http://localhost:3000'); // TODO setup for dev and prod
        this.state = props;
    }

    componentDidMount() {
        const { socket } = this;

        // Handle State changes here
        socket.emit('queryStudies', {});
        socket.on('queryStudies', studies => this.setState({ projects: studies }));
    }

    render() {
        const { state = {} } = this;

        return (
            <div>
                <ProjectList />
            </div>
        );
    }
}