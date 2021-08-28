import Link from 'next/link'


const Navbar = () => (
    <nav className='navbar'>
        <Link href='/'>
            <a className='navbar-brand'>Note App</a>
        </Link>
        <Link href='/new'>
            <a className='create'>Add Note</a>
        </Link>
    </nav>
)

export default Navbar