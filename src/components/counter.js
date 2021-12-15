import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, incrementBy, decrement } from '../redux/reducers/counter/counter-reducer'
// import { increment, incrementBy, decrement } from '../redux/reducers/counter/counter-reducer using-createReducer';

const Counter = () => {
    // Checking if object has value:
    // Instead of state && state.value use state?.value

    const state = useSelector(state => state);

    const dispath = useDispatch();
    return (
        <div className="App">
            <h1>Counter using React & Redux</h1>
            <h2>Counter: {state.value || 0}</h2>
            <button onClick={() => dispath(increment())}>+</button>
            <button onClick={() => dispath(decrement())}>-</button>
            <button onClick={() => dispath(incrementBy(2))}>Increment By 2</button>
        </div>
    );
};
export default Counter;