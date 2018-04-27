import Layout from '../Layout.js';
import styled from 'styled-components';
import CheckBox from '../CheckBox.js';

const Give = ({users}) => (
    <Container>
        <div>갚을사람</div>
        <CheckBox users={users} />
    </Container>
);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    background-color: #2d3436;
`

export default Give;