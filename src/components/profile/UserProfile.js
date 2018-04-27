import Layout from '../Layout.js';
import styled from 'styled-components';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const StyledCard = styled(Card)`
    width: 100%;
`;


const UserProfile = () => (
    <StyledCard>
        <CardHeader
        title="세르게이"
        subtitle="Subtitle"
        avatar="https://pbs.twimg.com/profile_images/674900083310092292/88WaIvo5.jpg"
        />
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText> 내 다리는 3개다 </CardText>
        {/* <CardActions>
        <FlatButton label="받을사람" />
        <FlatButton label="갚을사람" />
        </CardActions> */}
    </StyledCard>
);



export default UserProfile;