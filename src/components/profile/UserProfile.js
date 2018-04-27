import Layout from '../Layout.js';
import styled from 'styled-components';


const UserProfile = () => (
    <Container>
        <div>세르게이</div>
        <div>
            <img src="https://pbs.twimg.com/profile_images/674900083310092292/88WaIvo5.jpg" alt="" />
        </div>
        <div>내 다리는 3개다</div>
    </Container>
);

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export default UserProfile;