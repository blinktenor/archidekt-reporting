import axios from 'axios';
const url = 'https://archidekt-server.vercel.app';
const scryfallCards = {};

const fetchDecklistFromFolder = async (folderId) => {
  try {
    const response = await axios.get(`${url}/api/folder/${folderId}`);
    const decks = response.data;
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

//Should be storing more so I can use the art
const fetchPriceFromScryfall = async (cardName) => {
  if (scryfallCards[cardName]) {
    return scryfallCards[cardName].prices.usd;
  } else {
    const response = await axios.get(`https://api.scryfall.com/cards/search?q=${cardName} cheapest:usd`);
    scryfallCards[cardName] = response.data.data[0];
    return response.data.data[0].prices.usd;
  }
}

const getCardArt = (cardName) => {
  if (scryfallCards[cardName]) {
    return scryfallCards[cardName].image_uris.png;
  }
}


export { getCardArt, fetchCardlistFromDeck, fetchDecklistFromFolder, fetchPriceFromScryfall };