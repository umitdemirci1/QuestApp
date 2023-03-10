import Post from "../Post/Post"
import { useEffect, useState } from "react";
import PostForm from "../Post/Postform";

const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const [posts, setPosts] = useState([])

    const refreshPost = () => {
        fetch("http://localhost:8080/posts")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true)
                setPosts(result)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            }
        )
    }

    useEffect(() => {
       refreshPost()
    }, [posts])

    if (error) {
        return (
            <>
                <h1>Error is occured!</h1>
                {console.log(error)}
            </>
        )
    } else if (!isLoaded) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    } else {
        return (
            <>
                <PostForm 
                userId={"1"} 
                userName={"A"}
                refreshPost={refreshPost}></PostForm>
                {posts.map((post) => (
                    <Post 
                    title={post.title} 
                    text={post.text} 
                    postId={post.id} 
                    key={post.id}
                    userId={post.userId}
                    userName={post.userName}
                    ></Post>
                ))}
            </>
        );
    }

}

export default Home;