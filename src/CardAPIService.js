import axios from 'axios';
import archidekt from 'archidekt';

const fetchDecklistFromFolder = async (folderId) => {
  const response = await axios.get(`https://www.archidekt.com/api/decks/folders/${folderId}/?dir=asc&orderBy=name`);
  const { decks } = response.data;
  return decks;
};

const fetchCardlistFromDeck = async (deckId, ip) => {
  let response;
  try {
    response = await axios.get(`${ip}/decks/${deckId}`);
  } catch (e) {
    console.log(e);
  }
  const { cards } = response.data;
  return cards;
};

const fetchPriceFromScryfall = async (cardName) => {
	const response = await axios.get(`https://api.scryfall.com/cards/search?q=${cardName} cheapest:usd`);
  return response.data.data[0].prices.usd;
}


export { fetchCardlistFromDeck, fetchDecklistFromFolder, fetchPriceFromScryfall };