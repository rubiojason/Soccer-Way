import React, { useState } from 'react'; 

function HandleImg(props) {

    //useState 
    const [error, setError] = useState(false); 

    //function 
    const handleError = () => {
        setError(true); 
    }

    return (
        <img className={props.class} alt="" onError={handleError}
            src={
                props.img == null ? 
                    process.env.PUBLIC_URL + '/soccer_ball.png' : 
                error ? 
                    process.env.PUBLIC_URL + '/soccer_ball.png' : 
                props.img
            }
            />
    )
}

export default HandleImg; 
