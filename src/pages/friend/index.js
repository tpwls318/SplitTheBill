import Layout from '../../components/Layout.js';
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class extends React.Component {
    static async getInitialProps ({ req }) {
        if (req) {
            console.log('on server, need to copy cookies from req')
        } else {
            console.log('on client, cookies are automatic')
        }
        const res = await axios({
            url: 'http://127.0.0.1:3000/getsid',
            // manually copy cookie on server,
            // let browser handle it automatically on client
            headers: req ? {cookie: req.headers.cookie} : undefined,
        });
        const users = await axios.get({
            url: 'http://127.0.0.1:3000/getFriends',
            data: res.data
        })

        return { data: res.data };
    }

    state

    render() {  
        
        return (
            <Layout>
                <AddButton>
                    <Link href="/group/addGroup">
                    <ContentAdd style={{ color:'white', height:'56px' }} />
                    </Link>
                </AddButton>
                {/* <ul>
                {this.props.users.map( user => (
                   <UserProfile user={user.username} />
                ))}
                </ul> */}
            </Layout>
        );
    }
}

const UserProfile = ({user}) => (
  <div>
    {user}
  </div>
)

const AddButton = styled.div`
    display: flex;
    align-content: center;
    position: fixed;
    right: 24px;
    bottom: 24px;
    width: 56px;
    border-radius: 28px;
    height: 56px;
    justify-content: center;
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
