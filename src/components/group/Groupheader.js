import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const GroupHeader = () => (
    <div>
        <Link href="/friend">
          <a style={linkStyle}>Table</a>
        </Link>
        <Link href="/group">
          <a style={linkStyle}>Pay Man</a>
        </Link>
        <Link href="/profile">
          <a style={linkStyle}>How Much</a>
        </Link>
        <Link href="/help">
          <a style={linkStyle}>Date</a>
        </Link>
    </div>
)

export default GroupHeader;