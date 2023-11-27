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
                    src="./src/assests/NavAvatar.jpg"
                />
                <NavTitle>Let's Talk Podcasts</NavTitle>
            </NavTitleWrapper>
            <BarWrapper>
                <SearchBar search={search} />
            </BarWrapper>
        </TopNav>
    )
}