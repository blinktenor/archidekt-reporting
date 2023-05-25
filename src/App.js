import './App.css';
import FolderList from './FolderList';
import React from 'react';
import { useInput } from './hooks/input-hook';
import SearchContainer from './SearchContainer';
import DeckContainer from './DeckContainer';
import { fetchCardlistFromDeck, fetchDecklistFromFolder, fetchPriceFromScryfall } from './CardAPIService';

function ArchidektReporting() {
  const [decks, setDecks] = React.useState([]);
  const [scryfallPrices, setScryfallPrices] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [search, setSearch] = React.useState("Single");

  const { value: searchId, bind: bindSearchId } = useInput('');
  const { value: searchIp, bind: bindSearchIp } = useInput('');

  const updateSearchSetting = (event) => setSearch(event.target.value);

  const submitSearch = async () => {
    setLoading(true);
    if (search === 'Folder' && searchId !== '') {
      const decks = await fetchDecklistFromFolder(searchId, setDecks);
      if (decks) {
        setDecks(decks);
        setLoading(false);
        setLoaded(true);
      } else {
        setLoading(false);
      }
    } else if (search === 'Single' && searchId !== '') {
      setLoading(false);
      setLoaded(true);
    }
  }

  const fetchAndFilterCards = async (deckId, ip) => {
    const cards = await fetchCardlistFromDeck(deckId, ip);
    if (!cards) {
      return;
    }
    return await filterDeck(cards);
  }

  const filterDeck = async (cards) => {
    const removeMaybeboard = cards.filter(card => !card.categories.includes('Maybeboard'));
    const removeSideboard = removeMaybeboard.filter(card => !card.categories.includes('Sideboard'));
    const ninetyNinefiltered = removeSideboard.filter(card => (!(card.card.prices['ck'] < 1 || card.card.prices['tcg'] < 1)));
    const commanderFiltered = ninetyNinefiltered.filter(card => (!(card.card.prices['ck'] < 5 || card.card.prices['tcg'] < 5) || !card.categories.includes('Commander')));
    await lookupPricesOnScryfall(commanderFiltered);
    return commanderFiltered.filter(card => !(scryfallPrices[card.card.oracleCard.name] < 1))
  }

  const lookupPricesOnScryfall = async (cards) => {
    for (let a = 0; a < cards.length; a++) {
      const name = cards[a].card.oracleCard.name;
      let prices = scryfallPrices;
      if (!prices[name]) {
        const updatedPrice = await fetchPriceFromScryfall(name);
        prices[name] = updatedPrice;
        setScryfallPrices(prices);
      }
    }
  }

  if (!loading && !loaded) {
    return (
      <div className="ArchidektReporting">
        <SearchContainer 
          updateSearchSetting={updateSearchSetting} 
          bindSearchIp={bindSearchIp}
          bindSearchId={bindSearchId} 
          submitSearch={submitSearch} 
        />
      </div>
    );
  } else if (!loaded) {
    return (
      <div className="ArchidektReporting">
        Loading...
      </div>
    );
  } else {
    if (search === 'Single') {
      const deck = {id: searchId, name: ''};
      return (
        <div className="ArchidektReporting">
          <SearchContainer 
            updateSearchSetting={updateSearchSetting} 
            bindSearchIp={bindSearchIp}
            bindSearchId={bindSearchId} 
            submitSearch={submitSearch} 
          />
          <DeckContainer deck={deck} filterCallback={fetchAndFilterCards} ip={searchIp} />
        </div>
      );
    } else {
      return (
        <div className="ArchidektReporting">
          <SearchContainer 
            updateSearchSetting={updateSearchSetting} 
            bindSearchIp={bindSearchIp}
            bindSearchId={bindSearchId} 
            submitSearch={submitSearch} 
          />
          <FolderList decks={decks} filterCallback={fetchAndFilterCards} />
        </div>
      );
    }
  }
}

export default ArchidektReporting;
