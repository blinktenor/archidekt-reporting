function SearchContainer(props) {
  return (
    <div className="search-container">
      <input type="radio" name="searchType" value="Single" defaultChecked={true} onChange={props.updateSearchSetting} /> Single Deck
      <br />
      <input type="radio" name="searchType" value="Folder" onChange={props.updateSearchSetting} /> Folder
      <br />
      <br />
      Search Id <input className="search-input" type="text" value='521836' {...props.bindSearchId} /> 
      
      <button onClick={props.submitSearch}>Submit</button>
    </div>
  );
}

export default SearchContainer;

//IP Address <input className="search-input" type="text" {...props.bindSearchIp} />
