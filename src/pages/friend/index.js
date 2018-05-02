import Layout from '../../components/Layout.js';
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Avatar from 'material-ui/Avatar';

export default class extends React.Component {
    static async getInitialProps ({ req }) {
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 1b2f1a13133a9e755f0f0da52f1ab527cb9fb339
        const users = await axios.post('http://127.0.0.1:3000/getFriends').then(function (response) {
            console.log('dfdfdfdfdfdfdfd');
            
        }).catch(function (error) {
            console.log(error);
        });

        return { 
            data: users,
            list: [1,2,3,4,5]
         };
<<<<<<< HEAD
=======
        const res = await axios({
            url: 'http://127.0.0.1:3000/getsid',
            // manually copy cookie on server,
            // let browser handle it automatically on client
            headers: req ? {cookie: req.headers.cookie} : undefined,
        });
        const users = await [
            { username: 'erere' },
            { username: 'goods' },
            { username: 'hanko' }
        ];
        console.log('type@#@#@type', typeof res.data.sid);
        return { sid: res.data.sid, users: users };
>>>>>>> f33b1f921b7121f2334d2a181544b66f563fb423
=======

>>>>>>> 1b2f1a13133a9e755f0f0da52f1ab527cb9fb339
    }

    render() {  
        
        return (
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 1b2f1a13133a9e755f0f0da52f1ab527cb9fb339
            <Layout>
                <AddButton>
                    <Link href="/group/addGroup">
                    <ContentAdd style={{ color:'white', height:'56px' }} />
                    </Link>
                </AddButton>
                <Ul>
                    {this.props.list.map( item => (
                        <Item>
                            <Avatar src="https://pbs.twimg.com/profile_images/674900083310092292/88WaIvo5.jpg" />
                            <Comment> hello </Comment>
                        </Item>
                    ))}
                </Ul>
<<<<<<< HEAD
=======
            <Layout sid={this.props.sid}>
                <Link href="/group/addGroup">
                <button>add friend</button>
                </Link>
                <ul>
                {this.props.users.map( user => (
                   <UserProfile user={user.username} />
                ))}
                </ul>
>>>>>>> f33b1f921b7121f2334d2a181544b66f563fb423
=======

>>>>>>> 1b2f1a13133a9e755f0f0da52f1ab527cb9fb339
            </Layout>
        );
    }
}

const AddButton = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    right: 24px;
    bottom: 24px;
    width: 56px;
    border-radius: 28px;
    height: 56px;
    box-sizing: border-box;
    background-color: #0077ff;
    border: 1px solid #006be5;
    cursor: pointer;
    z-index: 10000000;
    color: white;
    &:hover {
        opacity: 0.6;
    }
`

const Ul = styled.ul`
    padding-left: 0px;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    padding: 1em;
    background-color: #ffeaa7;
    border-bottom 1px solid #b2bec3;
`

const Comment = styled.div`
    color: #636e72;
    padding-left: 1em;
`