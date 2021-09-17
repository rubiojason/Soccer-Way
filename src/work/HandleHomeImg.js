import React, { useState, useEffect } from 'react'; 
import { connect } from 'react-redux'; 
import HandleImg from './HandleImg';

function HandleHomeImg({ schedule, teamData }) {

    //useState 
    const [image, setImage] = useState(""); 

    //useEffect 
    useEffect(() => {
        for (var i = 0; i < teamData.length; i++) {
            if (schedule.HomeTeamId === teamData[i].TeamId) {
                setImage(teamData[i].WikipediaLogoUrl);   
            }
        }
    }, [teamData, schedule.HomeTeamId]); 

    return (
        <HandleImg img={image} />
    )
}

const mapStateToProp = state => {
    return {
        teamData: state.team.teamdata, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //fetchPlayersInTeam: (idx) => dispatch(fetchPlayersInTeam(idx)), 
        //fetchPlayerIndex: (idx) => dispatch(fetchPlayerIndex(idx)), 
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(HandleHomeImg)
