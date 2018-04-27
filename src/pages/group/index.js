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
                <h1>Select Group</h1>
                <ul>
                {this.props.users.map( user => (
                   <PostLink user={user} />
                ))}
                </ul>
            </Layout>
        );
    }
}

const PostLink = ({user}) => (
  <div>
    <Link prefetch href={`/group/table?title=${user}`}>
      <a>{user}</a>
    </Link>
  </div>
)

export default Index;


// const Index = (props) => (
//   <Layout>
//     <h1>Select Group</h1>
//     {props.users.map( user => (
//         <PostLink user={user} />
//     ))}
//   </Layout>
// )

// Index.getInitialProps = async function () {
//     const users = await ['Immersive 6','Immersive 5','Immersive 4'];

//     return {
//         users: users
//     }
// }
