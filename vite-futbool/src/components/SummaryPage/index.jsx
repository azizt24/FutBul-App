import SideNav from "../SideNav";
import SideNavLink from "../SideNavLink";
import { useState, useEffect } from "react";
import SummaryCard from "../SummaryCard";
import SummaryCell from "../SummaryCell";
import Footer from "../Footer";
import Header from "../Header";
import './SummaryPage.css';

function SummaryPage() {
    const [currentLeague, setCurrentLeague] = useState({}); // Initialize currentLeague

    useEffect(() => {
        fetchLeagues();
    }, []);

    useEffect(() => {
        if (currentLeague.id) {
            fetchStats();
        }
    }, [currentLeague]);

    const [leagues, setLeagues] = useState([]);
    const [currentTeams, setCurrentTeams] = useState([]);

    function fetchLeagues() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'fa4e7ea713msh45173df66620d61p1c516ajsne5d52645fa4c',
                'X-RapidAPI-Host': 'football-web-pages1.p.rapidapi.com'
            }
        };

        fetch('https://football-web-pages1.p.rapidapi.com/competitions.json?include=teams', options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setLeagues(response.competitions);
            })
            .catch(err => console.error(err));
    }

    function fetchStats() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'fa4e7ea713msh45173df66620d61p1c516ajsne5d52645fa4c',
                'X-RapidAPI-Host': 'football-web-pages1.p.rapidapi.com'
            }
        };

        fetch(`https://football-web-pages1.p.rapidapi.com/league-table.json?comp=${currentLeague.id}`, options)
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                setCurrentTeams(response['league-table'].teams);
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <Header />
            <div className="background w-100 h-100">
                <div className="text-center py-4" id="summary-header">
                    <h1 id="summary-title">Live</h1>
                    <p id="summary-subtitle">Get up-to-date with league tables and view upcoming fixtures</p>
                </div>
                <SideNav>
    {leagues && leagues.map((league, index) => (
        <SideNavLink
            key={index}
            name={league['full-name']}
            index={index}
            idnum={league.id}
            click={(event) => {
                event.preventDefault();
                setCurrentLeague(league);
            }}
        />
    ))}
</SideNav>

                <SummaryCard league={currentLeague['full-name']}>
                    {currentTeams.map((team) => (
                        <SummaryCell
                            key={team.id}
                            club={team.name}
                            clubid={team.id}
                            leagueid={currentLeague.id}
                            position={team.position}
                            played={team['all-matches'].played}
                            won={team['all-matches'].won}
                            drawn={team['all-matches'].drawn}
                            lost={team['all-matches'].lost}
                            goalDifference={team['all-matches']['goal-difference']}
                            points={team['total-points']}
                        />
                    ))}
                </SummaryCard>
                <Footer />
            </div>
        </>
    );
}

export default SummaryPage;
