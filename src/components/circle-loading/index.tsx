import style, { keyframes } from "styled-components"

const Animation = keyframes`
from {transform: rotate(0deg);}
to {transform: rotate(360deg);}
`
const Loading = style.div`
position: absolute;
top: 50%;
left: 50%;
width: 28px;
height: 28px;
margin: -14px 0 0 -14px;`

const MaskedCircle = style.div`
width: 20px;
height: 20px;
border-radius: 12px;
border: 3px solid white;`

const Mask = style.div`
width: 12px;
height: 12px;
overflow: hidden;`

const Spinner = style.div`
position: absolute;
left: 1px;
top: 1px;
width: 26px;
height: 26px;
animation: ${Animation} 1s infinite linear;`

export const CircleLoading = () => {
  return (
    <Loading>
      <Spinner>
        <Mask>
          <MaskedCircle />
        </Mask>
      </Spinner>
    </Loading>
  )
}
