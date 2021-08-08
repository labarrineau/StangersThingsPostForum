import React, { useState } from 'react';
import { callApi } from "../api";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const WriteAMessage = ({ postId, token }) => {

const [ writemessage, setWriteMessage ] = useState('')
   

const useStyles = makeStyles( (theme)  => ({
    button : {
        backgroundColor : "#C19A6B",
        color: "black",
    }
}))

const classes = useStyles();

const submitMessage = async (event) =>{
    event.preventDefault();

        const data = await callApi({
            url: `posts/${postId}/messages`,
            body: { message: { content: writemessage  }},
            method: 'POST',
            token,
        });
        console.log('sent message', data)
        setWriteMessage('')
        window.alert("Thank you for your message.")
}


return (
    <>
    <form onSubmit={submitMessage}>
        <input id="sendmessage"
            type="text"
            placeholder="Write a Message"
            value={writemessage}
            onChange={(event) => setWriteMessage(event.target.value)}>
        </input>
        <br></br>
        
        <Button variant="contained" 
                className= { classes.button } 
                type="submit" 
                style={{ textDecoration: 'none' , color:'black'}}>
                    Send Message
        </Button>
    </form>  
    </>
        );
};

export default WriteAMessage;