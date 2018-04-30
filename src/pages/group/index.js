
import Layout from '../../components/Layout.js';
import Link from 'next/link';
import Axios from 'axios';
import styled from 'styled-components';

class Good extends React.Component {
    static async getInitialProps () {
        const groups = await Axios.get('http://127.0.0.1:3000/getRooms')
        .catch( (err) => {
            if( err ) console.log('this is index Err!!!',err);
        });
        console.log('dfdfdfdfdfdf',groups);
        
        return {
            groups: groups.data,
        }
    }

    handleClick = (group) => {
        // console.log('dfdfdfdfdssssssssssssssssssss', group);
        Axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/getTables',
            data: {
                roomname : group
            }
          });
    }

    render() {
        
        return (
            <Layout>
                <AddButton>
                    <Link href="/group/addGroup">
                    <a>dfdf</a>
                    </Link>
                </AddButton>
                <Ul>
                {this.props.groups.map( (group, index) => (
                   <GroupLink group={group} key={index} onClick={ this.handleClick } />
                ))}
                </Ul>
            </Layout>
        );
    }
}

const GroupLink = ({ group, onClick }) => (
  <DivLink onClick ={ () => onClick(group) }   >
    <Link prefetch as={`/group/${group}`} href={`/group/table?title=${group}`}  >
      <H3 value={group} >{group}</H3>
    </Link>
  </DivLink>
)

export default Good;


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
const Ul = styled.ul`
    list-style-type: none;
    padding-left: 1em;
    padding-right: 1em;
`
const H3 = styled.h3`
    margin: 0 auto;
`

const DivLink = styled.div`
    padding: 20px;
    border-bottom: 1px solid red;
    &:hover {
        background: #eee;
        cursor: pointer;
    }
`