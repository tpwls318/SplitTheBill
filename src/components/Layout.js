import Header from './Header';
import styled from 'styled-components';
import Head from 'next/head';
import { Drawer, RaisedButton, MenuItem, AppBar, FlatButton, IconButton, IconMenu } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Link from 'next/link';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Layout extends React.Component {

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
     // console.log('Layout is ',check,this.state);
    
    return (
      <MuiThemeProvider>
        {/* {this.checkLogin()} */}
        <div>
        <AppBar
          title={<StyledSpan>Title</StyledSpan>}
          onLeftIconButtonClick={this.handleToggle}
          iconElementRight={ <Logged /> }
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

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem href="/signin" primaryText="Login" />
    <MenuItem href="/logout" primaryText="Log Out" />
    <MenuItem href="/signin/signup" primaryText="Sign up" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

const StyledSpan = styled.span`
  cursor: pointer;
`;


// this.state.logged ? <FlatButton href="/" label="LogOut" /> :
// <FlatButton href="/signin" label="Login" />


export default Layout;