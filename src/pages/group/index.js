import Layout from '../../components/Layout.js';
import Link from 'next/link';
import Axios from 'axios';
import styled from 'styled-components';

class Good extends React.Component {
    static async getInitialProps () {
        const groups = await Axios.get('/getRooms')
        .catch( (err) => {
            if( err ) console.log('this is index Err!!!',err);
        });

        return {
            groups: groups.data,
        }
    }

    handleClick = (e) => {
        console.log('dfdfdfdfd', e.target.value);
        Axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/test',
            data: e.target.value
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
                <ul>
                {this.props.groups.map( (group, index) => (
                   <GroupLink group={group} key={index} onClick={ this.handleClick } />
                ))}
                </ul>
            </Layout>
        );
    }
}

const GroupLink = ({group, onClick}) => (
  <DivLink onClick={ onClick } >
    <Link prefetch as={`/group/${group}`}href={`/group/table?title=${group}`}  >
      <button value={group} >{group}</button>
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
const DivLink = styled.div`
    padding: 20px;
    order: 1px solid red;
`