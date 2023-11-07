import React, { useState, useEffect } from 'react';
import HomePageCard from '../HomeCard1';
import { Link } from 'react-router-dom';
import './style.css';

function GenerateCards() {
  // Assigning my team's number
  const myTeam = localStorage.getItem('Fav team');

  // Setting states
  const [fromTeam, setFromTeam] = useState({
    stadium: 'stadium',
    web: '#',
    capacity: 'capacity',
  });

  const [fromLeague, setFromLeague] = useState({
    points: 'current points',
    played: 'matches played',
    currentPosition: 'current position',
  });

  const [fromStats, setFromStats] = useState({
    leagueName: 'League name',
  });

  useEffect(() => {
    // Function to fetch team
    function fetchTeam() {
      const url = `https://football-web-pages1.p.rapidapi.com/team.json?team=${myTeam}`;

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'ca358f8464mshb0db6b2cde321b7p1f76f7jsn19204a6d1082', // Replace with your API key
          'X-RapidAPI-Host': 'football-web-pages1.p.rapidapi.com',
        },
      };

      fetch(url, options)
        .then((res) => res.json()) 
        .then((json) => {
          setFromTeam({
            stadium: json.team.ground,
            capacity: json.team.capacity,
            teamName: json.team.name,
            web: json.team.website,
          });
        })
        .catch((err) => console.error('error:' + err));
    }

    // Function to fetch league atm
    function fetchLeague() {
      const url = `https://football-web-pages1.p.rapidapi.com/league-progress.json?team=${myTeam}`;

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'ca358f8464mshb0db6b2cde321b7p1f76f7jsn19204a6d1082', // Replace with your API key
          'X-RapidAPI-Host': 'football-web-pages1.p.rapidapi.com',
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          const currentPosition = json['league-progress'].progress.length - 1;
          setFromLeague({
            currentPosition: json['league-progress'].progress[currentPosition].position,
            points: json['league-progress'].progress[currentPosition].points,
            played: json['league-progress'].progress[currentPosition].played,
          });
        })
        .catch((err) => console.error('error:' + err));
    }

    // Function to fetch league name
    function fetchLeagueName() {
      const url = `https://football-web-pages1.p.rapidapi.com/league-table.json?comp=1&team=${myTeam}`;

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'ca358f8464mshb0db6b2cde321b7p1f76f7jsn19204a6d1082', // Replace with your API key
          'X-RapidAPI-Host': 'football-web-pages1.p.rapidapi.com',
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          setFromStats({
            leagueName: json['league-table'].competition.name,
          });
        })
        .catch((err) => console.error('error:' + err));
    }

    fetchTeam();
    fetchLeague();
    fetchLeagueName();
  }, [myTeam]);

  return (
    <div className="d-flex flex-wrap container-fluid justify-content-evenly">
      <div className="col-sm-6 col-md-4 col-lg-3">
        <HomePageCard
          title="Stadium"
          infoName="The stadium name is "
          info={fromTeam.stadium}
          infoName2="Capacity: "
          info2={fromTeam.capacity}
          link={<a className="homecardButton" rel="noreferrer" href={fromTeam.web} target="_blank">team web</a>}
        />
      </div>
      <div className="col-sm-6 col-md-4 col-lg-3">
        <HomePageCard
          title="League"
          infoName="The League name is "
          info={fromStats.leagueName}
          infoName2="Current position: "
          info2={fromLeague.currentPosition}
          link={<Link to="/saved" className="homecardButton" relative="path">See competition</Link>}
        />
      </div>
      <div className="col-sm-6 col-md-4 col-lg-3">
        <HomePageCard
          title="Stats"
          infoName="Points in the current league "
          info={fromLeague.points}
          infoName2="Matches played:"
          info2={fromLeague.played}
          link={<Link className="homecardButton" to="/live" relative="path">Go to stats</Link>}
        />
      </div>
    </div>
  );
}

export default GenerateCards;
