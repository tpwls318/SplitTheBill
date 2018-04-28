import Layout from '../Layout.js';
import styled from 'styled-components';
import CheckBox from '../CheckBox.js'

const Receive = ({users}) => (
    <Container>
        <div>받을사람</div>
        <CheckBox users={users} />
    </Container>
);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width:50%;
    background-color: #636e72;
`

export default Receive;