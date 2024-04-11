import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/testing.css";
import aboutImage from '../../images/pexels-anil-sharma-16062162.jpg';


function MatchCard({ match }) {

  const winnerAnnounced = match.winner !== null;

  const currentDate = new Date();
  const matchDate = new Date(match.matchDate);
  const timeRemaining = matchDate.getTime() - currentDate.getTime();
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 3600));
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 3600)) / (1000 * 60));
  const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  const [remainingTime, setRemainingTime] = useState({
    hours: hoursRemaining,
    minutes: minutesRemaining,
    seconds: secondsRemaining
  });
  

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevState => {
        let { hours, minutes, seconds } = prevState;
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(timer);
            } else {
              hours--;
              minutes = 59;
              seconds = 59;
            }
          } else {
            minutes--;
            seconds = 59;
          }
        } else {
          seconds--;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const ongoingMatch = winnerAnnounced ? false : matchDate <= currentDate;

  return (
    <div className="news-card">
      {winnerAnnounced ? (
        <h3 className="news-card__header">Completed Matches</h3>
      ) : ongoingMatch ? (
        <h3 className="news-card__header">Ongoing Matches</h3>
      ) : (
        <h3 className="news-card__header">Upcoming Matches</h3>
      )}
      <div className="news-card__text-wrapper">
        <p className="news-card__match-date">{new Date(match.matchDate).toLocaleString()}</p>
        {winnerAnnounced ? (
          <>
            <h2 className="news-card__title">{`${match.team1} vs ${match.team2}`}</h2>
            <div className="news-card__details-wrapper">
              {winnerAnnounced && (
                <p className="news-card__excerpt">
                  <strong style={{ color: 'red' }}>{`${match.winner} won by ${Math.abs(getRuns(match.runsWicketsTeam1) - getRuns(match.runsWicketsTeam2))} runs`}</strong>
                </p>
              )}
            </div>
          </>
        ) : ongoingMatch ? (
          <>
            <h2 className="news-card__title">{`${match.team1} vs ${match.team2}`}</h2>
            <div className="news-card__details-wrapper">
              <p className="news-card__excerpt">
                <strong>Ongoing Match</strong>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="news-card__details-wrapper">
              <p className="news-card__excerpt"><strong>{`${match.team1} vs ${match.team2}`}</strong></p>
              <p className="news-card__excerpt">
                Match in {remainingTime.hours} hours {remainingTime.minutes} minutes {remainingTime.seconds} seconds
              </p>
            </div>
          </>
        )}
       
        <Link to={`/tournaments/matches/update-result/${match.matchId}`} matchId={match.matchId}    className="update-result-button">
          Update Result
        </Link>
      </div>
      <img src={aboutImage} alt="" className="news-card__image" />

    </div>
  );
}

export default  MatchCard;

function getRuns(runsWickets) {
  const runsWicketsArray = runsWickets.split("-");
  return parseInt(runsWicketsArray[0]);
}
