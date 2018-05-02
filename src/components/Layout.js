import Header from './Header';
import styled from 'styled-components';
import Head from 'next/head';
import { Drawer, RaisedButton, MenuItem, AppBar, FlatButton, IconButton  } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Link from 'next/link';

const StyledSpan = styled.span`
  cursor: pointer;
`;

export default class Layout extends React.Component {
  static async getInitialProps ({ req }) {
    if (req) {
        console.log('on server, need to copy cookies from req')
    } else {
        console.log('on client, cookies are automatic')
    }
    const res = await axios.get('/getsid',{
        // manually copy cookie on server,
        // let browser handle it automatically on client
        headers: req ? {cookie: req.headers.cookie} : undefined,
    });
    return { data: res.data };
  }
 
  state = {
    open: false,
    sid: null
  };
  // checkLogin = () => {
  //   this.setState({
  //     sid: this.props.data ? this.props.data
  //   });
  // }
  handleToggle = () => this.setState( prevState => ({open: !prevState.open}));

  render() {
    return (
      <MuiThemeProvider>
        {/* {this.checkLogin()} */}
        <div>
        <AppBar
          title={<StyledSpan>Title</StyledSpan>}
          onLeftIconButtonClick={this.handleToggle}
          
          iconElementRight={<FlatButton href="/signin" label="Login" />}
        />
        {this.props.children}
        <Drawer width={200} open={this.state.open} onClick={this.handleToggle}>
          <AppBar title="AppBar" onClick={this.handleToggle}/>
          <Header />
        </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}



// export default Layout;