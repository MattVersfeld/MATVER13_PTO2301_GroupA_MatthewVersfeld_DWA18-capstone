import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import SearchBar from './SearchBar';

const TopNav = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
    color: 'white',
    top: 0,
    left: 0,
    zIndex: 100,
});

const NavAvatar = styled(Avatar)({
    margin: '20px',
})

const NavTitle = styled('h1')({
})

const BarWrapper = styled('div')({
    backgroundColor: '#FFFFF7',
    height: '75%',
    margin: '10px',
    borderRadius: '5px',
})

const NavTitleWrapper = styled('div')({
    display: 'flex',
})

// @ts-expect-error
export default function Navbar(props) {
    const { search } = props
    return (
        <TopNav>
            <NavTitleWrapper>
                <NavAvatar
                    src="https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <NavTitle>Let's Talk Podcasts</NavTitle>
            </NavTitleWrapper>
            <BarWrapper>
                <SearchBar search={search} />
            </BarWrapper>
        </TopNav>
    )
}