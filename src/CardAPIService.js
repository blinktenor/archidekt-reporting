import axios from 'axios';
// import archidekt from 'archidekt';
const url = 'https://archidekt-server.vercel.app';

const fetchDecklistFromFolder = async (folderId) => {
  try {
    const response = await axios.get(`${url}/api/folder/${folderId}`);
    console.log('searching decks')
    const decks = response.data;
    console.log(response)
    return decks;
  } catch (e) {
    console.log(e);
  }
};

const fetchCardlistFromDeck = async (deckId, ip) => {
  let response;
  try {
    response = await axios.get(`${url}/api/deck/${deckId}`);
    const { cards } = response.data;
    return cards;
  } catch (e) {
    console.log(e);
  }
};

const fetchPriceFromScryfall = async (cardName) => {
  const response = await axios.get(`https://api.scryfall.com/cards/search?q=${cardName} cheapest:usd`);
  return response.data.data[0].prices.usd;
}


export { fetchCardlistFromDeck, fetchDecklistFromFolder, fetchPriceFromScryfall };