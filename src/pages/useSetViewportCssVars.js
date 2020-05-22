import React, { useState, useEffect } from "react"

function useResize() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  const handleResize = () => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    })
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return dimensions
}

export function useSetViewportCssVars() {
  const { height, width } = useResize()
  const vh = height * 0.01
  const vw = width * 0.01
  document.documentElement.style.setProperty("--vh", `${vh}px`)
  document.documentElement.style.setProperty("--vw", `${vw}px`)
}
