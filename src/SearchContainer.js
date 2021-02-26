function SearchContainer(props) {
  return (
    <div className="search-container">
      <input type="radio" name="searchType" value="Folder" defaultChecked={true} onChange={props.updateSearchSetting} /> Folder
      <input type="radio" name="searchType" value="Single" onChange={props.updateSearchSetting} /> Single Deck
      <input className="search-input" type="text" {...props.bindSearchId} />
      <button onClick={props.submitSearch}>Submit</button>
    </div>
  );
}

export default SearchContainer;
