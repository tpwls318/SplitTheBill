import Layout from '../components/Layout.js';
import Link from 'next/link';
import axios from'axios';


export default class extends React.Component {
  static async getInitialProps ( {req} ) {
      let check;
      if(req) check = !!req.session.displayID;
      const res = await axios({
          url: 'http://127.0.0.1:3000/getsid',
          headers: req ? {cookie: req.headers.cookie} : undefined,
      });
      return { 
        check
      };
  }
  render() {
    // console.log('this is home',this.props.check);
    return (
      <Layout close={this.props.check}>
        <h2>asdf@@@@@@@@@@@@2</h2>
      </Layout>
    )
  }
}