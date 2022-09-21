import React from "react";
import { useAnimatedScale, useDimension } from "./hooks";

const withContext = (MainComponent : React.FC<any>) => {
    return (props : any) => {
        const {w, h} = useDimension()
        const {scale, start : onClick} = useAnimatedScale()
        const mainProps = {
            ...props, 
            scale, 
            w, 
            h, 
            onClick

        }
        return <MainComponent {...mainProps}></MainComponent>
    }
}

export default withContext