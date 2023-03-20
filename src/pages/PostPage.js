import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function PostPage(){
    // When this page is mounted we want to grab the information about this specific post so use the useeffect
    // if we want to run a dependencies then its on empty array but since we dont need to run it so empty array
    //since we want to run the function when our post page component mounts and now we want to do fetch 

    // in order to get the idea of post we will use the function useParam in react-router-dom and we cant call it inside the callback must put outside in callback
    const {id} = useParams();
    const [postinfo, setpostInfo] = useState(null);
    useEffect(() => {
        // since we want to run the function when our post page component mounts and now we want to do fetch and
        //then we want to grab the resposne and to do and we want to transform the response into a JSON object lets say that
        //the fetch link will respond with JSON and now it will be the postinfo containing the information so that we can set it to our state which is the 
        //postInfo, setpostInfo
            fetch(`http://localhost:4000/posts/${id}`).then(response => {
                response.json().then(postinfo => {
                    setpostInfo(postinfo);
                })
            })
    }, [])
    return(
        <div className=' pt-[90px] -mb-24' >
      <div className="p-[19px]">
            Post Page Here
        </div>
        </div>
    )
}