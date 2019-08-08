import React from 'react';
import { Typography } from '@material-ui/core'
import ContactDetails from '../contactDetails';
import withWidth from '@material-ui/core/withWidth';
import GroupMembers from './groupMembers'


const ColoredLine = ({ color }) => (
    <hr
        style={{
            backgroundColor: color,
            height: 5,
            border: 0
        }}
    />
);

function ContactsTable(props) {
    const { width } = props;

    return (
        <div style={{ padding: '20px 50px 0 50px'}}>
            {props.groups.map(group => (
                <React.Fragment key={group.id}>
                    <Typography gutterBottom variant="h5">
                        {group.name}
                    </Typography>
                    <ColoredLine color="rgb(6, 106, 114)" />
                    <GroupMembers groupId={group.id} contacts={group.contacts} />
                </React.Fragment>
                ))
            }
        </div>
    );
}
export default withWidth()(ContactsTable);