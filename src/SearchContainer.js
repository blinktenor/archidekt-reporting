function SearchContainer(props) {
  return (
    <div className="search-container">
      <div className="deck-type-container">
        <input type="radio" name="deckType" value="Single" defaultChecked={true} onChange={props.updateDeckSetting} /> Single Deck
        <input type="radio" name="deckType" value="Folder" onChange={props.updateDeckSetting} /> Folder
      </div>
      <div className="format-type-container">
        <input type="radio" name="formatType" value="DollaryDo" defaultChecked={true} onChange={props.updateSearchSetting} /> Dollary Do
        <input type="radio" name="formatType" value="Uncommmon" onChange={props.updateSearchSetting} /> Uncommon
      </div>
      <br />
      <br />
      Search Id <input className="search-input" type="text" value='521836' {...props.bindSearchId} /> 
      
      <button onClick={props.submitSearch}>Submit</button>
    </div>
  );
}

export default SearchContainer;
