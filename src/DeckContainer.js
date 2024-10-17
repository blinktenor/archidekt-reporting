import React from 'react';
import './container.css';
import { getCardArt } from './CardAPIService';

function DeckContainer(props) {
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(true);
  const [cards, setCards] = React.useState([]);
  const { id } = props.deck;
  const { filterCallback, ip } = props;

  React.useEffect(() => {
    const setCardList = async (deckID, ip) => {
      setLoading(true);
      const filteredCards = await filterCallback(deckID, ip);
      setCards(filteredCards);
      setLoaded(true);
      setLoading(false);
    }

    if (!loading && !loaded) {
      setCardList(id, ip);
    }
  }, [filterCallback, id, ip, loading, loaded]);

  React.useEffect(() => {
    setLoading(false);
    setLoaded(false);
  }, [id]);


  if (loading) {
    return (
      <div className="archidektContainer" key={props.deck.id}>
        <div className="deck-name"> { props.deck.name }</div>
        Loading cards... {props.progress}
      </div>
    );
  }

  if (!loading && !cards?.length) {
    return (
      <div className="archidektContainer" key={props.deck.id}>
        <div className="deck-name"> { props.deck.name }</div> is all set!
      </div>
    );
  }

  return (
    <div className="archidektContainer" key={props.deck.id}>
      <div className="deck-name"> { props.deck.name }</div>
      { 
        cards.map((card) => (
          <div key={card.card.id} className="card-container">
            <img className="card-img" height="100px" src={getCardArt(card.card.oracleCard.name)} alt={card.card.oracleCard.name} />
            {card.card.oracleCard.name} 
            <br />
            {card.card.prices['ck']} | {card.card.prices['tcg']}
            <br />
            {card.card.edition.editionname}
          </div>
        ))
      }
    </div>
  );
}

export default DeckContainer;