function SearchContainer(props) {
  return (
    <div className="search-container">
      <input type="radio" name="searchType" value="Single" defaultChecked={true} onChange={props.updateSearchSetting} /> Single Deck
      <br />
      <br />
      <br />
      Deck Id <input className="search-input" type="text" {...props.bindSearchId} /> 
      IP Address <input className="search-input" type="text" {...props.bindSearchIp} />
      <button onClick={props.submitSearch}>Submit</button>
    </div>
  );
}

export default SearchContainer;

//<input type="radio" name="searchType" value="Folder" onChange={props.updateSearchSetting} /> Folder
