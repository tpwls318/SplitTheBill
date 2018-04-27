import Layout from '../../components/Layout.js'
import Link from 'next/link'

class Index extends React.Component {
    static async getInitialProps () {
        const users = await ['Immersive 6','Immersive 5','Immersive 4'];

        return {
            users: users
        }
    }

    render() {
        
        return (
            <Layout>
                <h2>Select Group</h2>
                <ul>
                {this.props.users.map( user => (
                   <GroupLink user={user} />
                ))}
                </ul>
            </Layout>
        );
    }
}

const GroupLink = ({user}) => (
  <div>
    <Link prefetch href={`/group/table?title=${user}`}>
      <a>{user}</a>
    </Link>
  </div>
)

export default Index;
