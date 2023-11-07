import React from 'react';
import teamData from '../../assets/teams-list.json';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const teamArray = [];

for (let i = 0; i < teamData.competitions.length; i++) {
    for (let j = 0; j < teamData.competitions[i].teams.length; j++) {
        let teamObj = {
            name: teamData.competitions[i].teams[j].name,
            id: teamData.competitions[i].teams[j].id,
        };
        teamArray.push(teamObj);
    }
}

console.log(teamArray);

function TeamAutoComplete(props) {



  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = props.whichPage


  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
 
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={teamArray}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
          />
        </div>

  )
}

export default TeamAutoComplete;