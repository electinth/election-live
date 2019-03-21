import { useState, useEffect } from "react"

/**
 * @param {object} props
 * @param {number} props.value
 * @param {number} props.initialValue
 * @param {(value: number) => React.ReactNode} props.children
 */
export default function AnimatedNumber({
  value,
  initialValue = null,
  children = value => value,
}) {
  const [currentValue, setCurrentValue] = useState(
    initialValue == null ? value : initialValue
  )
  const animate = nextValue => {
    const timeout = setTimeout(() => setCurrentValue(nextValue), 16)
    return () => clearTimeout(timeout)
  }
  useEffect(() => {
    if (currentValue < value) {
      return animate(currentValue + Math.ceil((value - currentValue) / 3))
    } else if (currentValue > value) {
      return animate(currentValue - Math.ceil((currentValue - value) / 3))
    }
  }, [currentValue, value])
  return children(currentValue)
}
