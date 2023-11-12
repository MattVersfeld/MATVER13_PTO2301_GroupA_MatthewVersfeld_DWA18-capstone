import Carousel from 'React-material-ui-carousel'
import { Paper, Button, styled } from '@mui/material'

const CarStyle = styled('div')({


})

const ImgStyle = styled('img')({
    maxWidth: '20%',

})

const ContentWrapper = styled(Carousel)({
    backgroundPosition: 'center',
})

export default function LandingCarousel(props) {
    const { data } = props

    return (
        <CarStyle>
            <ContentWrapper>
                {
                    data.map((item, i) => <Item key={i} item={item} />)
                }
            </ContentWrapper>
        </CarStyle>
    )
}

function Item(props) {
    return (
        <>
            <Paper>
                <ImgStyle src={props.item.image}></ImgStyle>
                {/* <Button className="CheckButton">
                Check it out!
            </Button> */}
            </Paper>
        </>
    )
}