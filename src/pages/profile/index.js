import Layout from '../../components/Layout.js';
import styled from 'styled-components';
import UserProfile from '../../components/profile/UserProfile.js';
import Give from '../../components/profile/Give.js';
import Receive from '../../components/profile/Receive.js';
import {Component} from 'react';


class Index extends Component {
    static async getInitialProps () {
        const users = ['세르게이','전한길','김재현'];

        return {
            users
        }
    }
    render() {
        return (
            <Layout>
            <Container>
                <UserProfile />
                <Give users={this.props.users}/>
                <Receive users={this.props.users}/>
            </Container>
          </Layout>
        )
    }

};

const Container = styled.div`
    display: flex;
    width: 100%;
`

export default Index;