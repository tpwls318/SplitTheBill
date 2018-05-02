import Layout from '../Layout.js';
import styled from 'styled-components';

const Receive = ({users}) => (
    <Container>
        <Header>받을사람</Header>
        <Ul>
            {users.map( user => (
                <List> {user.name} : {user.money} </List>
            ))}
        </Ul>
    </Container>
);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width:50%;
    background-color: #74b9ff;
    @media (max-width: 700px) {
        width: 100%;
        background-color: #d35400;
    }
`
const Ul = styled.div`
    padding-left: 1em;
`
const Header = styled.div`
    padding: 0.8em;
    color: white;
`
const List = styled.div`
    padding-left: 1em;
    padding-bottom: 0.5em;
    color: white;
`

export default Receive;