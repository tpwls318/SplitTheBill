
import Layout from '../../components/Layout.js';
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';
// Axios.defaults.port = 3000;
import ContentAdd from 'material-ui/svg-icons/content/add';

class Good extends React.Component {

    static async getInitialProps ({ req }) {
        let check;
        if(req) check = !!req.session.displayID;
        console.log(`dis Id: ${req.session.displayID}`);
        let userID = {userID :req.session.displayID}
        const res = await axios.post('http://127.0.0.1:3000/getRooms',userID);
        return { groups: res.data.rooms, check };
    }

    render() {
        return (
            <Layout close={this.props.check}>
                <AddButton>
                    <Link href="/group/addGroup">
                        <ContentAdd style={{ color:'white', height:'56px' }} />
                    </Link>
                </AddButton>
                <Ul>
                {this.props.groups.map( (group, index) => (
                   <GroupLink group={group} key={index} />
                ))}
                </Ul>
            </Layout>
        );
    }
}

const GroupLink = ({ group }) => (
  <DivLink >
    <Link prefetch as={`/group/${group}`} href={`/group/table?title=${group}`}  >
      <H3 value={group} >{group}</H3>
    </Link>
  </DivLink>
)

export default Good;


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
const Ul = styled.ul`
    list-style-type: none;
    padding-left: 1em;
    padding-right: 1em;
`
const H3 = styled.h3`
    margin: 0 auto;
`

const DivLink = styled.div`
    border-radius: 18px;
    background-color: white;
    padding: 20px;
    margin-bottom: 0.5em;
    &:hover {
        background: #eee;
        cursor: pointer;
    }
`