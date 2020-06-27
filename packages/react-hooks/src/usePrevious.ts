import { useEffect, useRef } from 'react'

const usePrevious = <T>(value: T) => {
  const ref = useRef<T | null>(null)
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

export default usePrevious
