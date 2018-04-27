import Layout from '../../components/Layout.js';
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';

const Ul = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
`
const Li = styled.li`
    float: left;
`

class Index extends React.Component {
    static async getInitialProps () {
        const groups = await ['Immersive 6','Immersive 5','Immersive 4'];

        return {
            groups: groups
        }
    }

    render() {
        
        return (
            <Layout>
                <AddButton />
                <ul>
                {this.props.groups.map( group => (
                   <GroupLink group={group} />
                ))}
                </ul>
            </Layout>
        );
    }
}

const AddButton = () => (
    <ul>
        <Link href="/group/addGroup">
                <button>add group</button>
        </Link>
    </ul>
)

const GroupLink = ({group}) => (
  <div>
    <Link prefetch href={`/group/table?title=${group}`}>
      <a>{group}</a>
    </Link>
  </div>
)

export default Index;
