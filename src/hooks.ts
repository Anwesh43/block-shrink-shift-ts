import {useState, useEffect, CSSProperties} from 'react'

const scGap : number = 0.01
const delay : number = 20 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {

        }
    })
    return {
        w,
        h
    }
}

const maxScale : Function = (scale : number, i : number, n : number) => Math.max(0, scale - i / n)

const divideScale : Function = (scale : number, i : number, n : number) => Math.min(1 / n, maxScale(scale, i, n))

const sinify : Function = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const size : number = Math.min(w, h) / 10
    const sf : number = sinify(scale)
    const sf1 : number = divideScale(sf, 0, 2)
    const sf2 : number = divideScale(sf, 1, 2)
    return {
        blockStyle() : CSSProperties {
            const position = 'absolute'
            const left = `${w / 2 - (size) * sf1}px`
            const top = `${h / 2 - size / 2 + size * sf2}px`
            const width = `${size}px`
            const height = `${size * (1 - sf2)}px`
            return {
                position, 
                left, 
                top, 
                width, 
                height, 
                background: 'indigo'
            }
        }
    }
}