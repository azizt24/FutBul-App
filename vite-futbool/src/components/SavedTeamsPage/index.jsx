import React, { useState, useEffect } from 'react';
import SavedTeamsCard from '../SavedTeamsCard';
import Header from '../Header';
import Footer from '../Footer';
import axios from 'axios';

import teamsJSON from '../../assets/teams-list.json';

function findTeamIDByName(inputTeamName) {
  for (let i = 0; i < teamsJSON.competitions.length; i++) {
    for (let j = 0; j < teamsJSON.competitions[i].teams.length; j++) {
      if (teamsJSON.competitions[i].teams[j].name === inputTeamName) {
        return teamsJSON.competitions[i].teams[j].id;
      }
    }
  }
  return null; // Handle the case where the team is not found
}

function findTeamCompByName(inputTeamName) {
  for (let i = 0; i < teamsJSON.competitions.length; i++) {
    for (let j = 0; j < teamsJSON.competitions[i].teams.length; j++) {
      if (teamsJSON.competitions[i].teams[j].name === inputTeamName) {
        return teamsJSON.competitions[i].fullName;
      }
    }
  }
  return null; // Handle the case where the team is not found
}

function SavedTeamsPage() {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const savedTeamName = localStorage.getItem('NewsInfo');
    const secondTeamName = localStorage.getItem('secondTeam');
    const teamsToFetch = [savedTeamName];

    if (secondTeamName) {
      teamsToFetch.push(secondTeamName);
    }

    async function fetchTeamData() {
      const newTeamData = [];

      for (const teamName of teamsToFetch) {
        const teamID = findTeamIDByName(teamName);

        if (teamID) {
          const options = {
            method: 'GET',
            url: 'https://football-web-pages1.p.rapidapi.com/team.json',
            params: { team: teamID },
            headers: {
              'X-RapidAPI-Key': 'ca358f8464mshb0db6b2cde321b7p1f76f7jsn19204a6d1082',
              'X-RapidAPI-Host': 'football-web-pages1.p.rapidapi.com',
            },
          };

          try {
            const groundData = await axios.request(options);

            const options2 = {
              method: 'GET',
              url: 'https://football-web-pages1.p.rapidapi.com/league-progress.json',
              params: { team: teamID },
              headers: {
                'X-RapidAPI-Key': 'ca358f8464mshb0db6b2cde321b7p1f76f7jsn19204a6d1082',
                'X-RapidAPI-Host': 'football-web-pages1.p.rapidapi.com',
              },
            };

            const leagueData = await axios.request(options2);

            const options3 = {
              method: 'GET',
              url: 'https://football-web-pages1.p.rapidapi.com/records.json',
              params: { team: teamID },
              headers: {
                'X-RapidAPI-Key': 'ca358f8464mshb0db6b2cde321b7p1f76f7jsn19204a6d1082',
                'X-RapidAPI-Host': 'football-web-pages1.p.rapidapi.com',
              },
            };

            const recordsData = await axios.request(options3);

            const options4 = {
              method: 'GET',
              url: 'https://football-web-pages1.p.rapidapi.com/goalscorers.json',
              params: { team: teamID },
              headers: {
                'X-RapidAPI-Key': 'ca358f8464mshb0db6b2cde321b7p1f76f7jsn19204a6d1082',
                'X-RapidAPI-Host': 'football-web-pages1.p.rapidapi.com',
              },
            };

            const goalscorerData = await axios.request(options4);

            const options5 = {
              method: 'GET',
              url: 'https://joj-image-search.p.rapidapi.com/v2/',
              params: {
                q: `${goalscorerData.data.goalscorers.players[0]['first-name']} ${goalscorerData.data.goalscorers.players[0]['last-name']} portrait`,
              },
              headers: {
                'X-RapidAPI-Key': 'fa4e7ea713msh45173df66620d61p1c516ajsne5d52645fa4c',
                'X-RapidAPI-Host': 'joj-image-search.p.rapidapi.com',
              },
            };

            const goalscorerImg = await axios.request(options5);

            newTeamData.push({
              teamName: teamName,
              teamID: teamID,
              ground: {
                groundName: groundData.data.team.ground,
                groundCapacity: groundData.data.team.capacity,
              },
              league: {
                leagueName: findTeamCompByName(teamName),
                leaguePosition: leagueData.data["league-progress"].progress[leagueData.data["league-progress"].progress.length - 1].position,
                leaguePlayed: leagueData.data["league-progress"].progress[leagueData.data["league-progress"].progress.length - 1].played,
                leaguePoints: leagueData.data["league-progress"].progress[leagueData.data["league-progress"].progress.length - 1].points,
              },
              goalscorers: {
                firstName: goalscorerData.data.goalscorers.players[0]['first-name'],
                lastName: goalscorerData.data.goalscorers.players[0]['last-name'],
                playerID: goalscorerData.data.goalscorers.players[0].id,
                goals: goalscorerData.data.goalscorers.players[0].goals.length,
                playerImg: goalscorerImg.data.response.images[0].image.url,
              },
              records: {
                biggestVictory: {
                  description: recordsData.data.records.records[2].description,
                  date: recordsData.data.records.records[2].matches[0].date,
                  matchID: recordsData.data.records.records[2].matches[0].id,
                  attendance: recordsData.data.records.records[2].matches[0].attendance,
                  homeTeamName: recordsData.data.records.records[2].matches[0]["home-team"].name,
                  homeTeamScore: recordsData.data.records.records[2].matches[0]["home-team"].score,
                  awayTeamName: recordsData.data.records.records[2].matches[0]["away-team"].name,
                  awayTeamScore: recordsData.data.records.records[2].matches[0]["away-team"].score,
                },
                heaviestDefeat: {
                  description: recordsData.data.records.records[5].description,
                  date: recordsData.data.records.records[5].matches[0].date,
                  matchID: recordsData.data.records.records[5].matches[0].id,
                  attendance: recordsData.data.records.records[5].matches[0].attendance,
                  homeTeamName: recordsData.data.records.records[5].matches[0]["home-team"].name,
                  homeTeamScore: recordsData.data.records.records[5].matches[0]["home-team"].score,
                  awayTeamName: recordsData.data.records.records[5].matches[0]["away-team"].name,
                  awayTeamScore: recordsData.data.records.records[5].matches[0]["away-team"].score,
                },
                highestScoring: {
                  description: recordsData.data.records.records[8].description,
                  date: recordsData.data.records.records[8].matches[0].date,
                  matchID: recordsData.data.records.records[8].matches[0].id,
                  attendance: recordsData.data.records.records[8].matches[0].attendance,
                  homeTeamName: recordsData.data.records.records[8].matches[0]["home-team"].name,
                  homeTeamScore: recordsData.data.records.records[8].matches[0]["home-team"].score,
                  awayTeamName: recordsData.data.records.records[8].matches[0]["away-team"].name,
                  awayTeamScore: recordsData.data.records.records[8].matches[0]["away-team"].score,
                },
                highestAttendance: {
                  description: recordsData.data.records.records[11].description,
                  date: recordsData.data.records.records[11].matches[0].date,
                  matchID: recordsData.data.records.records[11].matches[0].id,
                  attendance: recordsData.data.records.records[11].matches[0].attendance,
                  homeTeamName: recordsData.data.records.records[11].matches[0]["home-team"].name,
                  homeTeamScore: recordsData.data.records.records[11].matches[0]["home-team"].score,
                  awayTeamName: recordsData.data.records.records[11].matches[0]["away-team"].name,
                  awayTeamScore: recordsData.data.records.records[11].matches[0]["away-team"].score,
                },
                lowestAttendance: {
                  description: recordsData.data.records.records[14].description,
                  date: recordsData.data.records.records[14].matches[0].date,
                  matchID: recordsData.data.records.records[14].matches[0].id,
                  attendance: recordsData.data.records.records[14].matches[0].attendance,
                  homeTeamName: recordsData.data.records.records[14].matches[0]["home-team"].name,
                  homeTeamScore: recordsData.data.records.records[14].matches[0]["home-team"].score,
                  awayTeamName: recordsData.data.records.records[14].matches[0]["away-team"].name,
                  awayTeamScore: recordsData.data.records.records[14].matches[0]["away-team"].score,
                },
              },
            });

            if (newTeamData.length === teamsToFetch.length) {
              setTeamData(newTeamData);
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          console.error(`Team ID not found for team: ${teamName}`);
        }
      }
    }

    fetchTeamData();
  }, []);

  return (
    <section id="homepage">
      <div id="homepage-wrapper">
        <Header />
        <div>
          {teamData.map(function (t) {
            return (
              <SavedTeamsCard
                key={t.teamID}
                teamName={t.teamName}
                groundName={t.ground.groundName}
                groundCapacity={t.ground.groundCapacity}
                leagueName={t.league.leagueName}
                leaguePosition={t.league.leaguePosition}
                leaguePlayed={t.league.leaguePlayed}
                leaguePoints={t.league.leaguePoints}
                firstName={t.goalscorers.firstName}
                lastName={t.goalscorers.lastName}
                goals={t.goalscorers.goals}
                playerImg={t.goalscorers.playerImg}
                WINdescription={t.records.biggestVictory.description}
                WINdate={t.records.biggestVictory.date}
                WINattendance={t.records.biggestVictory.attendance}
                WINhomeTeamName={t.records.biggestVictory.homeTeamName}
                WINhomeTeamscore={t.records.biggestVictory.homeTeamScore}
                WINawayTeamName={t.records.biggestVictory.awayTeamName}
                WINawayTeamScore={t.records.biggestVictory.awayTeamScore}
                LOSSdescription={t.records.heaviestDefeat.description}
                LOSSdate={t.records.heaviestDefeat.date}
                LOSSattendance={t.records.heaviestDefeat.attendance}
                LOSShomeTeamName={t.records.heaviestDefeat.homeTeamName}
                LOSShomeTeamscore={t.records.heaviestDefeat.homeTeamScore}
                LOSSawayTeamName={t.records.heaviestDefeat.awayTeamName}
                LOSSawayTeamScore={t.records.heaviestDefeat.awayTeamScore}
                SCOREdescription={t.records.highestScoring.description}
                SCOREdate={t.records.highestScoring.date}
                SCOREattendance={t.records.highestScoring.attendance}
                SCOREhomeTeamName={t.records.highestScoring.homeTeamName}
                SCOREhomeTeamscore={t.records.highestScoring.homeTeamScore}
                SCOREawayTeamName={t.records.highestScoring.awayTeamName}
                SCOREawayTeamScore={t.records.highestScoring.awayTeamScore}
                HIGHdescription={t.records.highestAttendance.description}
                HIGHdate={t.records.highestAttendance.date}
                HIGHattendance={t.records.highestAttendance.attendance}
                HIGHhomeTeamName={t.records.highestAttendance.homeTeamName}
                HIGHhomeTeamscore={t.records.highestAttendance.homeTeamScore}
                HIGHawayTeamName={t.records.highestAttendance.awayTeamName}
                HIGHawayTeamScore={t.records.highestAttendance.awayTeamScore}
                LOWdescription={t.records.lowestAttendance.description}
                LOWdate={t.records.lowestAttendance.date}
                LOWattendance={t.records.lowestAttendance.attendance}
                LOWhomeTeamName={t.records.lowestAttendance.homeTeamName}
                LOWhomeTeamscore={t.records.lowestAttendance.homeTeamScore}
                LOWawayTeamName={t.records.lowestAttendance.awayTeamName}
                LOWawayTeamScore={t.records.lowestAttendance.awayTeamScore}
              />
            );
          })}
        </div>
        <Footer />
      </div>
    </section>
  );
}

export default SavedTeamsPage;
