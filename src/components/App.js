import React, { useState, useEffect } from "react";
import { Link, Route, useParams, useHistory } from "react-router-dom";
import { callApi } from '../api';
import { Register } from './';
import SinglePost from './SinglePost';
import PostsList from './PostsList';
import CreateNewPost from './CreateNewPost';
import EditPost from './EditPost';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system'
import Box from '@material-ui/core/Box'


const useStyles = makeStyles( theme => ({
    button : {
        backgroundColor : "#C19A6B",
        color: "black"
    }
}))


const fetchUserData = async (token) => {
    const { data } = await callApi ({
        url: '/users/me',
        token,
    });
    return data;
};

const fetchPosts = async (token) => {
    const {
        data: { posts },
    } = await callApi({ 
        url: '/posts', 
        token, 
    })

    return posts;
}



const App = () => {

    const classes = useStyles();

    const [token, setToken] = useState('');
    const [userData, setUserData] = useState({});
    const [posts, setPosts] = useState([]);

    // const { postId } = useParams();
 
    const isLoggedIn = userData.username !== undefined;


    const onLogOutClick = () => {
        localStorage.removeItem('st-token');
        setToken(""),
        setUserData({});
    };


    useEffect(async () => {
        if (posts.length === 0) {
            const fetchedPosts = await fetchPosts(token);
            setPosts(fetchedPosts);
        }
    });

    useEffect(async () => {
        if (!token) {
            setToken(localStorage.getItem('st-token'));
            return;
        }
        const data = await fetchUserData(token);
        setUserData(data);
    }, [token]);

    // console.log("app.js userData.messages", userData.messages)
    // console.log("app.js userData", userData)

 
     return(
        <>
    <div id="pageContainer">

            <Route exact path='/'>

                {isLoggedIn ? (
                    
                    <div id="topmenu">
                        <Box mx={1}>
                            <Button id="viewallpostsbutton"  variant="contained" className= { classes.button } > 
                                    <Link to='/posts' style={{ textDecoration: 'none' , color:'black'}}>
                                        View All Posts
                                    </Link>
                            </Button>
                        </Box>
                        <Box mx={1}>
                            <Button id="createnewpostsbutton" variant="contained" className= { classes.button }> 
                                    <Link to='/createNewPost' style={{ textDecoration: 'none' , color:'black'}}>
                                        Create New Post
                                    </Link>
                            </Button>
                        </Box>
                        <div id="greeting">
                            <Box mx={1}>
                               <p style={{margin:"10px"}}> <b >Hello, {userData.username}</b> </p>
                                <Button variant="contained" className= { classes.button } onClick = {onLogOutClick} style={{ textDecoration: 'none' , color:'black'}}>
                                    Log Out
                                </Button>
                            </Box>
                        </div>
 
                    </div>
               
                ) : (
                    
                    <>
                        <div id="loginRegister">
                        <Button variant="contained" className= { classes.button }>
                            <Link to='/register'>Register</Link>
                        </Button>

                        <Button variant="contained" className= { classes.button }>
                            <Link to='/login'>Login</Link>
                        </Button>
                        </div>
                    </>
                )}

        <h1 id="forum">Stranger's Things Forum</h1>

            {isLoggedIn ? (
                    <>
                        <h2>{userData.username}'s Profile Home</h2>
                        <h3>My Posts</h3>
                        <div id="posts">
                            {userData.posts.map((post) => (

                                post.active 
                                ?
                                
                                    <div key={post._id} >
                                        <SinglePost posts={posts} post={post} token={token} isMe={true} />
                                    </div>
                                    
                                :
                                null
                            ))}                           
                        </div>
                        <h3>Messages I've Sent</h3>
                        <div id="mypostmessages">
                            {userData.messages.map((message) => (

                                message.fromUser._id === userData._id
                                ?

                                    <div key={message._id} className="messagedOtherPosts">
                                        <div><b>Post:</b> {message.post.title}</div>  
                                        <div><b>Message:</b> {message.content}</div>   
                                    </div>   

                                :
                                null
                            ))}
                    </div>
                    </>

            ) : (
                
                <>
                <h3>Current Posts</h3>
                    <div id="posts">
                                {posts.map((post) => (
                                    <div key={post._id} >
                                        <SinglePost posts={posts} post={post} token={token} />
                                    </div>))}
                            </div>
            </>
                )}
            </Route>

            <Route exact path="/posts">
                <PostsList posts={posts} token={token} onLogOutClick={onLogOutClick} />
            </Route>

            <Route exact path="/posts/:postId">
                <SinglePost posts={posts} token={token} />
            </Route>

            <Route exact path="/editpost/:postId">
                <EditPost posts={posts} token={token} />
            </Route>

            <Route exact path="/createNewPost">
                <CreateNewPost token = {token} />
            </Route>
 
            <Route path ='/register'>
                <Register action='register' setToken={setToken} />
            </Route>

            <Route path ='/login'>
                <Register action='login' setToken={setToken} />
            </Route>
        </div>
        </>
    );
};

export default App;