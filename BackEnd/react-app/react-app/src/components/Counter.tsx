import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { decrement, increment, incrementByAmount, reset, setLoading } from '../store/slices/counterSlice'

const Counter: React.FC = () => {
  const { value, isLoading } = useAppSelector((state) => state.counter )

  useEffect(() => {
    localStorage.setItem("counter", JSON.stringify(value));
  },[value]);
  const dispatch = useAppDispatch()
  const [customAmount, setCustomAmount] = useState<number>(5)

  const handleAsyncIncrement = async () => {
    dispatch(setLoading(true))
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000))
    dispatch(increment())
    dispatch(setLoading(false))
  }

  const handleCustomIncrement = () => {
    dispatch(incrementByAmount(customAmount))
  }

  return (
    <div className="counter">
      <div className="counter-display">
        <h3>Count: {value}</h3>
        {isLoading && <p>Loading...</p>}
      </div>

      <div className="counter-controls">
        <button onClick={() => dispatch(increment())} disabled={isLoading}>
          +1
        </button>
        <button onClick={() => dispatch(decrement())} disabled={isLoading}>
          -1
        </button>
        <button onClick={handleAsyncIncrement} disabled={isLoading}>
          Async +1
        </button>
        <button onClick={() => dispatch(reset())} disabled={isLoading}>
          Reset
        </button>
      </div>

      <div className="counter-custom">
        <input
          type="number"
          value={customAmount}
          onChange={(e) => setCustomAmount(Number(e.target.value))}
          disabled={isLoading}
        />
        <button onClick={handleCustomIncrement} disabled={isLoading}>
          Add {customAmount}
        </button>
      </div>
    </div>
  )
}

export default Counter
