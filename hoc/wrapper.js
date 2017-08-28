import Nav1 from './nav';
import Styles from './styles';

export default WrappedComponent => {
    const enhanced = Styles(Nav1(WrappedComponent));
    enhanced.getInitialProps = WrappedComponent.getInitialProps;

    return enhanced;
};