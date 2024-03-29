import React from 'react';
import './index.css';
import { render } from 'react-snapshot';
import ArchidektReporting from './App';
import reportWebVitals from './reportWebVitals';

render(
  <ArchidektReporting />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
