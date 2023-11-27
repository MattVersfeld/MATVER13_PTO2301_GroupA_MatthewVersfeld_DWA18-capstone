import Carousel from 'react-material-ui-carousel/dist'
import { Paper, styled } from '@mui/material'
import generateCode from '../utils/keygen'

const CarStyle = styled('div')({
    marginTop: '90px',
    width: '100%',

})

const ImgStyle = styled('img')({
    width: '100%',
    borderRadius: '10px',
    padding: '5px',

})

const ContentWrapper = styled(Carousel)({
    borderRadius: '5px',

})

const Test = styled(Paper)({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    padding: '10px',
})
// @ts-expect-error
export default function LandingCarousel(props) {
    const { data } = props


    const arr1 = data.slice(0, 3)
    const arr2 = data.slice(4, 7)
    const arr3 = data.slice(8, 11)


    return (
        <CarStyle>
            <ContentWrapper indicators={false}>

                <Item item={arr1} />
                <Item item={arr2} />
                <Item item={arr3} />

            </ContentWrapper>
        </CarStyle>
    )
}
// @ts-expect-error
function Item(props) {
    const { item } = props
    return (
        <>
            <Test>
                {item.map((item: any) => <ImgStyle key={generateCode(16)} src={item.image}></ImgStyle>)}
            </Test>
        </>
    )
}