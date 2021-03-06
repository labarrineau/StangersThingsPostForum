
import React from 'react';
import { useParams } from 'react-router-dom';


const MessagesToMe = ({ posts, post,  token}) => {

    const { postId } = useParams();

    if (posts?.length === 0) return null;

    let postToRender;

    if (post) {
        postToRender = post;
    } else {
        postToRender = posts?.find((post) => postId === post._id);
    }

    return (

            <>
                {postToRender.messages?.map((message) => (
                    <div className="messages" key={message._id}>
                        <div><b>Sender:</b> {message.fromUser.username}</div>
                        <div><b>Message:</b> {message.content}</div>
                    </div>
                ))}
            </>

    );
};

export default MessagesToMe;