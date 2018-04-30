import Layout from '../../components/Layout.js';
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';

class Index extends React.Component {
    static async getInitialProps () {
        // const groups = await axios.get('/getgroup')
        const groups = await ['Immersive6','Immersive5','Immersive4'];
        return {
            groups
        }
    }

    render() {
        
        return (
            <Layout>
                <AddButton>
                    <Link href="/group/addGroup">
                    <a>dfdf</a>
                    </Link>
                </AddButton>
                <ul>
                {this.props.groups.map( group => (
                   <GroupLink group={group} />
                ))}
                </ul>
            </Layout>
        );
    }
}

const GroupLink = ({group}) => (
  <DivLink>
    <Link prefetch as={`/group/${group}`} href={`/group/table?title=${group}`}>
      <a>{group}</a>
    </Link>
  </DivLink>
)

export default Index;


const AddButton = styled.div`
    display: flex;
    position: relative;
    min-width: 56px;
    height: 56px;
    justify-content: center;
    box-sizing: border-box;
    background-color: #0077ff;
    border: 1px solid #006be5;
    cursor: pointer;
    width: 56px;
    border-radius: 28px;
`
const DivLink = styled.div`
    padding: 20px;
    order: 1px solid red;
`