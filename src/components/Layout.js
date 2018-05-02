import Header from './Header';
import styled from 'styled-components';
import Head from 'next/head';
import { Drawer, RaisedButton, MenuItem, AppBar, FlatButton, IconButton  } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Link from 'next/link';
import axios from 'axios';


<<<<<<< HEAD
<<<<<<< HEAD
class Layout extends React.Component {

=======
=======




>>>>>>> 1b2f1a13133a9e755f0f0da52f1ab527cb9fb339
export default class extends React.Component {
  // static async getInitialProps ({ req }) {
  //   console.log('$%$%$%$%$%$%$%0');
    // if (req) {
    //     console.log('on server, need to copy cookies from req')
    // } else {
    //     console.log('on client, cookies are automatic')
    // }
    // const res = await axios({
    //     url: 'http://127.0.0.1:3000/getsid',
    //     // manually copy cookie on server,
    //     // let browser handle it automatically on client
    //     headers: req ? {cookie: req.headers.cookie} : undefined,
    // });
  //   return { data: 'asdf' };
  // }

 
<<<<<<< HEAD
>>>>>>> f33b1f921b7121f2334d2a181544b66f563fb423
=======

>>>>>>> 1b2f1a13133a9e755f0f0da52f1ab527cb9fb339
  state = {
    open: false,
    sid: ''
  };

<<<<<<< HEAD
<<<<<<< HEAD
=======
  

>>>>>>> f33b1f921b7121f2334d2a181544b66f563fb423
=======

>>>>>>> 1b2f1a13133a9e755f0f0da52f1ab527cb9fb339
  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    // console.log('Layout is ',check,this.state);
    
    return (
      <MuiThemeProvider>
        {console.log('!@!@!@!@!@!@!@',this.state.sid)}
        <div>
        <AppBar
          title={<StyledSpan>Title</StyledSpan>}
          onLeftIconButtonClick={this.handleToggle}
<<<<<<< HEAD
<<<<<<< HEAD
          iconElementRight={
            this.state.logged ? <FlatButton href="/" label="LogOut" /> :
             <FlatButton href="/signin" label="Login" />}
=======
          
          iconElementRight={this.state.sid ? <FlatButton href="/logout" label="Logout" /> : <FlatButton href="/signin" label="Login" />}
>>>>>>> f33b1f921b7121f2334d2a181544b66f563fb423
=======

          
          iconElementRight={this.state.sid ? <FlatButton href="/logout" label="Logout" /> : <FlatButton href="/signin" label="Login" />}

>>>>>>> 1b2f1a13133a9e755f0f0da52f1ab527cb9fb339
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


<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 1b2f1a13133a9e755f0f0da52f1ab527cb9fb339
const StyledSpan = styled.span`
  cursor: pointer;
`;


<<<<<<< HEAD
export default Layout;
=======
// export default Layout;
>>>>>>> f33b1f921b7121f2334d2a181544b66f563fb423
=======


// export default Layout;

>>>>>>> 1b2f1a13133a9e755f0f0da52f1ab527cb9fb339
