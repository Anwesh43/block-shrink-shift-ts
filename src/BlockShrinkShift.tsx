import { useStyle } from "./hooks";
import withContext from "./withContext";

interface BSSProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : () => void 
}

const BlockShrinkShift = (props : BSSProps) => {
    const {blockStyle} = useStyle(props.w, props.h, props.scale)
    return <div style = {blockStyle()} onClick = {() => props.onClick()}></div>
}

export default withContext(BlockShrinkShift)