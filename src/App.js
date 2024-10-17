import './App.css';
import FolderList from './FolderList';
import React from 'react';
import { useInput } from './hooks/input-hook';
import SearchContainer from './SearchContainer';
import DeckContainer from './DeckContainer';
import { 
  fetchCardlistFromDeck, 
  fetchDecklistFromFolder, 
  fetchPriceFromScryfall, 
  fetchRarityFromScryfall,
} from './CardAPIService';

function ArchidektReporting() {
  const [decks, setDecks] = React.useState([]);
  const [scryfallPrices, setScryfallPrices] = React.useState({});
  const [scryfallRarity, setScryfallRarity] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [deck, setDeck] = React.useState("Single");
  const [search, setSearch] = React.useState("DollaryDo");
  const [progress, setProgress] = React.useState(0);

  const { value: searchId, bind: bindSearchId } = useInput('');
  const { value: searchIp, bind: bindSearchIp } = useInput('');

  const updateDeckSetting = (event) => setDeck(event.target.value);
  const updateSearchSetting = (event) => setSearch(event.target.value);

  const submitSearch = async () => {
    setLoading(true);
    if (deck === 'Folder' && searchId !== '') {
      const decks = await fetchDecklistFromFolder(searchId, setDecks);
      if (decks) {
        setDecks(decks);
        setLoading(false);
        setLoaded(true);
      } else {
        setLoading(false);
      }
    } else if (deck === 'Single' && searchId !== '') {
      setLoading(false);
      setLoaded(true);
    }
  }

  const fetchAndFilterCards = async (deckId, ip) => {
    if (!loading) {
      setLoading(true);
      const cards = await fetchCardlistFromDeck(deckId, ip);
      if (!cards) {
        return;
      }
      await filterDeck(cards);
      setLoading(false);
      setLoaded(true);
      return;
    }
  }

  const filterDeck = async (cards) => {
    if (search === 'DollaryDo') {
      return await filterOnPrice(cards);
    } else {
      return await filterOnRarity(cards);
    }
  }

  const filterOnRarity = async (cards) => {
    const removeMaybeboard = cards.filter(card => !card.categories.includes('Maybeboard'));
    const removeSideboard = removeMaybeboard.filter(card => !card.categories.includes('Sideboard'));
    await lookupRarityOnScryfall(removeSideboard);
    const nonUncommon = removeSideboard.filter(card => (scryfallRarity[card.card.oracleCard.name] !== 'uncommon'));
    return nonUncommon.filter(card => (scryfallRarity[card.card.oracleCard.name] !== 'common'));
  }

  const lookupRarityOnScryfall = async (cards) => {
    for (let a = 0; a < cards.length; a++) {
      setProgress(a + 1);
      const name = cards[a].card.oracleCard.name;
      let rarity = scryfallRarity;
      if (!rarity[name]) {
        const currentRarity = await fetchRarityFromScryfall(name);
        rarity[name] = currentRarity;
        setScryfallRarity(rarity);
      }
    }
  }

  const filterOnPrice = async (cards) => {
    const removeMaybeboard = cards.filter(card => !card.categories.includes('Maybeboard'));
    const removeSideboard = removeMaybeboard.filter(card => !card.categories.includes('Sideboard'));
    const ninetyNinefiltered = removeSideboard.filter(card => (!(card.card.prices['ck'] < 1 || card.card.prices['tcg'] < 1)));
    const commanderFiltered = ninetyNinefiltered.filter(card => (!(card.card.prices['ck'] < 5 || card.card.prices['tcg'] < 5) || !card.categories.includes('Commander')));
    await lookupPricesOnScryfall(commanderFiltered);
    return commanderFiltered.filter(card => !(scryfallPrices[card.card.oracleCard.name] < 1));
  }

  const lookupPricesOnScryfall = async (cards) => {
    for (let a = 0; a < cards.length; a++) {
      setProgress(a + 1);
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
          updateDeckSetting={updateDeckSetting}
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
    if (deck === 'Single') {
      const deckInfo = {id: searchId, name: ''};
      return (
        <div className="ArchidektReporting">
          <SearchContainer 
            updateSearchSetting={updateSearchSetting} 
            updateDeckSetting={updateDeckSetting}
            bindSearchIp={bindSearchIp}
            bindSearchId={bindSearchId} 
            submitSearch={submitSearch} 
          />
          <DeckContainer deck={deckInfo} filterCallback={fetchAndFilterCards} ip={searchIp} progress={progress} />
        </div>
      );
    } else {
      return (
        <div className="ArchidektReporting">
          <SearchContainer 
            updateSearchSetting={updateSearchSetting} 
            updateDeckSetting={updateDeckSetting}
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
