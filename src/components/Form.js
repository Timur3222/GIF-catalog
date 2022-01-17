import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, clear, group, tooltipToggle } from '../store/gifSlice';

function Form() {

  const [input, setInput] = useState('');

  const isLoading = useSelector(state => state.gif.isLoading);
  const isGroupped = useSelector(state => state.gif.isGroupped);
  const tooltipTitle = useSelector(state => state.gif.tooltipTitle);
  const tooltipActive = useSelector(state => state.gif.tooltipActive);

  const dispatch = useDispatch();

  const inputHandler = (e) => {
    e.preventDefault();
    if(e.target.value === '' || (/^[a-zA-Z,.+-=~_?!$%& \d \t]+$/).test(e.target.value)) {
      dispatch(tooltipToggle({title: tooltipTitle, status: false}));
      setInput(e.target.value);
    } else {
      dispatch(tooltipToggle({title: 'Допустима только латиница', status: true}));
      setTimeout(() => {
        dispatch(tooltipToggle({title: tooltipTitle, status: false}));
      }, 2000);
    }
  }

  const downloadHandler = (e) => {
    e.preventDefault();
    dispatch(addImage(input));
  }

  const clearHandler = () => {
    dispatch(clear());
    setInput('');
  }

  const groupHandler = () => {
    dispatch(group());
  }

  return (
    <form>
      <div style={tooltipActive ? {opacity: '1'} : {opacity: '0'}} className='tooltip'>
        <span className='tooltip-text'>{tooltipTitle}</span>
      </div>
      <input value={input} onChange={inputHandler} placeholder='Поиск' className='search-input' type="text" />

      <button
        onClick={downloadHandler}
        className={isLoading ? 'download-btn-disabled' : 'download-btn'}
        type='submit'>
        {isLoading ? 'Загрузка...' : 'Загрузить'}
      </button>
      
      <button onClick={clearHandler} className='clear-btn' type='button'>Очистить</button>

      <button
        onClick={groupHandler}
        className='group-btn'
        type='button'>
        {isGroupped ? 'Разгруппировать' : 'Группировать'}
      </button>
    </form>
  );
}

export default Form;
