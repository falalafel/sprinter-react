import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import styles from "./Dashboard.styles";
import ProjectMembersCreateItem from "./ProjectMembersCreateItem";


class TestComponent extends React.Component {
    
    render() {
        return (
            <div className='TwojaStara'>
                <ProjectMembersCreateItem userName="mateuszek"/>
            </div>
        );
    }
}

export default withStyles(styles)(TestComponent);