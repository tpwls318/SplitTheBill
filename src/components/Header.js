import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div>
        <Link href="/friend">
          <a style={linkStyle}>Friend</a>
        </Link>
        <Link href="/group">
          <a style={linkStyle}>Group</a>
        </Link>
        <Link href="/profile">
          <a style={linkStyle}>Profile</a>
        </Link>
        <Link href="/help">
          <a style={linkStyle}>Help</a>
        </Link>
        <Link href="/signin">
          <a style={linkStyle}>Login</a>
        </Link>
    </div>
)

export default Header