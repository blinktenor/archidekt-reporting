import React from 'react';
import './container.css';

function DeckContainer(props) {
  const [loading, setLoading] = React.useState(true);
  const [cards, setCards] = React.useState([]);
  const { id } = props.deck;
  const { filterCallback } = props;

  React.useEffect(() => {
    const setCardList = async (deckID) => {
      const filteredCards = await filterCallback(deckID);
      setCards(filteredCards);
      setLoading(false);
    }

    setCardList(id);
  }, [id, filterCallback]); 

  if (loading) {
    return (
      <div className="archidektContainer" key={props.deck.id}>
        <div className="deck-name"> { props.deck.name }</div>
        Loading cards...
      </div>
    );
  }

  if (!loading && !cards.length) {
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
          <div key={card.card.id} className="container">
            {card.card.oracleCard.name} | {card.card.prices['ck']} | {card.card.prices['tcg']}
          </div>
        ))
      }
    </div>
  );
}

export default DeckContainer;