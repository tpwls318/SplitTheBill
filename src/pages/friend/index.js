import Layout from '../../components/Layout.js';
import Link from 'next/link';
import axios from 'axios';

export default class extends React.Component {
    static async getInitialProps () {
        const users = await [
            { username: 'erere' },
            { username: 'goods' },
            { username: 'hanko' }
        ];

        return {
            users
        }
    }

    render() {
        
        return (
            <Layout>
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

