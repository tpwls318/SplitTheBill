import Layout from '../../components/Layout.js';
import Groupheader from '../../components/group/Groupheader.js';
import styled from 'styled-components';

const PostLink = ({user}) => (
    <Label>
        <input type="checkbox" />
        <span className="checkmark"></span>
        {user}
    </Label>
  )

class Table extends React.Component {
    static async getInitialProps () {
        const users = await ['세르게이','전한길','김재현'];

        return {
            users: users
        }
    }

    render() {
        
        return (
            <Layout>
                <button>+table</button>
                <h1>{this.props.url.query.title}G</h1>
                <Groupheader />
                    {this.props.users.map( user => (
                        <PostLink user={user} />
                    ))}
            </Layout>
        );
    }
} 

export default Table;


const Label = styled.label`
    display: block;
    position: relative;
    padding-left: 35px;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`
// const res = await fetch('C:/Users/rucky/Desktop/im-06-1st-prj-nobrain-noplan/src/fakedata.js');

