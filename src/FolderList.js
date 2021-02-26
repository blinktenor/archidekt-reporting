import './App.css';
import DeckContainer from './DeckContainer';
import React from 'react';
import { fetchDecklistFromFolder } from './CardAPIService'


function FolderList(props) {
  return (
    <div className="ArchidektReporting">
      {props.decks.map(deck => (<DeckContainer key={deck.id} deck={deck} filterCallback={props.filterCallback} />)) }
    </div>
  );
}

export default FolderList;
