import Layout from '../components/Layout.js';
import Link from 'next/link';
import axios from'axios';


export default class extends React.Component {
  static async getInitialProps ({ req }) {
      console.log('$%$%$%$%$%$%$%0');
      if (req) {
          //console.log('on server, need to copy cookies from req')
      } else {
          //console.log('on client, cookies are automatic')
      }
      const res = await axios({
          url: 'http://127.0.0.1:3000/getsid',
          // manually copy cookie on server,
          // let browser handle it automatically on client
          headers: req ? {cookie: req.headers.cookie} : undefined,
      });
      console.log('type@#@#@type', typeof res.data.sid);
      return { sid: res.data.sid };
  }
  render() {
    return (
      <Layout  sid={this.props.sid}>
        <h2>asdf@@@@@@@@@@@@2</h2>
      </Layout>
    )
  }
}
