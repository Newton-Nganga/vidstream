import React,{useEffect,useRef,useState} from 'react'

export default function useScrollPosition():Boolean {
    const [scrollPosition, setScrollPosition] = useState<boolean>(false)
    const navRef = useRef<boolean>()
    navRef.current = scrollPosition
    useEffect(() => {
      const handleScroll = () => {
        const show = window.scrollY > 100
        if (navRef.current !== show) {
          setScrollPosition(show)
        }
      }
      document.addEventListener('scroll', handleScroll)
      return () => {
        document.removeEventListener('scroll', handleScroll)
      }
    }, [])

    return scrollPosition
}