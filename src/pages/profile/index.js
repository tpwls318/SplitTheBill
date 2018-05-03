import Layout from '../../components/Layout.js';
import styled from 'styled-components';
import UserProfile from '../../components/profile/UserProfile.js';
import Give from '../../components/profile/Give.js';
import Receive from '../../components/profile/Receive.js';
import {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';


class Index extends Component {
    static async getInitialProps ({req}) {
        const check = !!req.session.displayID ? true : false;
        const users = [
            { name: '기리보이' , money: '12000'},
            { name: '고수' , money: '3000'},
            { name: '배추' , money: '1246789'}
        ];
        const res = await axios({
            url: 'http://127.0.0.1:3000/getsid',
            headers: req ? {cookie: req.headers.cookie} : undefined,
        });
        console.log('on profile ',req.session);
        return { sid: res.data.sid, users: users, check };
    }

    render() {
        
        return (
            <Layout close={this.props.check}>
            <Container>
                <UserProfile />
            </Container>
            <Container>
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
    @media (max-width: 700px) {
        display: flex;
        flex-direction: column;
    }
`

                

export default Index;