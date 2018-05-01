import Layout from '../../components/Layout.js';
import Link from 'next/link';
import axios from 'axios';

export default class extends React.Component {
    static async getInitialProps ({ req }) {
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
    }

    render() {  
        
        return (
            <Layout sid={this.props.sid}>
                <Link href="/group/addGroup">
                <button>add friend</button>
                </Link>
                <ul>
                {this.props.users.map( user => (
                   <UserProfile user={user.username} />
                ))}
                </ul>
            </Layout>
        );
    }
}

const UserProfile = ({user}) => (
  <div>
    {user}
  </div>
)

