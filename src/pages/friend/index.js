import Layout from '../../components/Layout.js';
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Avatar from 'material-ui/Avatar';

export default class extends React.Component {
    static async getInitialProps ({ req }) {
        const users = await axios.post('http://127.0.0.1:3000/getFriends').then(function (response) {
            console.log('dfdfdfdfdfdfdfd');
            
        }).catch(function (error) {
            console.log(error);
        });

        return { 
            data: users,
            list: [1,2,3,4,5]
         };
    }

    render() {  
        
        return (
            <Layout>
                <AddButton>
                    <Link href="/group/addGroup">
                    <ContentAdd style={{ color:'white', height:'56px' }} />
                    </Link>
                </AddButton>
                <Ul>
                    {this.props.list.map( item => (
                        <Item>
                            <Avatar src="https://pbs.twimg.com/profile_images/674900083310092292/88WaIvo5.jpg" />
                            <Comment> hello </Comment>
                        </Item>
                    ))}
                </Ul>
            </Layout>
        );
    }
}

const AddButton = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    right: 24px;
    bottom: 24px;
    width: 56px;
    border-radius: 28px;
    height: 56px;
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
    padding-left: 0px;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    padding: 1em;
    background-color: #ffeaa7;
    border-bottom 1px solid #b2bec3;
`

const Comment = styled.div`
    color: #636e72;
    padding-left: 1em;
`