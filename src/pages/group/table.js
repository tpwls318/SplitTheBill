import Layout from '../../components/Layout.js';
import CheckBox from '../../components/CheckBox.js';
import Groupheader from '../../components/group/Groupheader.js';
import styled from 'styled-components';
import Link from 'next/link';

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
                <Link href="/group/addTable">
                <button>+table</button>
                </Link>
                <h1>{this.props.url.query.title}G</h1>
                <Groupheader />
                <CheckBox users={this.props.users} />
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
