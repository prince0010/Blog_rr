import { format } from "date-fns";
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { UserContext } from "../components/UserContext";
import {MdModeEditOutline} from 'react-icons/md'

export default function PostPage(){
    // When this page is mounted we want to grab the information about this specific post so use the useeffect
    // if we want to run a dependencies then its on empty array but since we dont need to run it so empty array
    //since we want to run the function when our post page component mounts and now we want to do fetch 

    // in order to get the idea of post we will use the function useParam in react-router-dom and we cant call it inside the callback must put outside in callback
    const {id} = useParams();
    const [postinfo, setpostInfo] = useState(null);
    const {userInfo} = useContext(UserContext);
    useEffect(() => {
        // since we want to run the function when our post page component mounts and now we want to do fetch and
        //then we want to grab the resposne and to do and we want to transform the response into a JSON object lets say that
        //the fetch link will respond with JSON and now it will be the postinfo containing the information so that we can set it to our state which is the 
        //postInfo, setpostInfo
            fetch(`http://localhost:4000/post/${id}`).then(response => {
                response.json().then(postinfo => {
                setpostInfo(postinfo);
                });
            });
    }, [id]);
    
    //if the postinfo is not content or no postinfo then it will be empty string
    if(!postinfo) return '';
    //else this will return if there's postinfo
    return(
        <div className='pt-[130px] -mb-24 p-page'>
             <h1 className=" font-bold max-w-3xl ml-80 text-3xl flex items-center justify-center "> {postinfo.title} </h1>
             <p className="text-sm text-gray-500 -ml-[-322px] mt-3"> By: {postinfo.author.username} <time>{format(new Date(postinfo.createdAt), 'MMM dd, yyyy HH:mm')}</time></p>
            {userInfo.id === postinfo.author._id && (
                <div className=" bg-primaryblack text-white hover:scale-90 duration-300 py-2 mx-auto w-[130px] rounded-lg">
                    {/* we will call the postinfo._id to 'to' in Link since it contains the _id of the post that you want to edit or it contains the ID of the posts */}
                    {/* if naay   to={`/edit/${postinfo._id} ingon ana sa Link then ang route dayon dapat naay 'edit/:id sa app.js sa Route*/}
                    <Link className="inline-flex pl-2 items-center -ml-1 gap-1" to={`/edit/${postinfo._id}`}> <MdModeEditOutline className="m-1 mt-2" size={12}/> Edit This Post</Link>
                </div>
            )}
        <div className="p-[12px] flex justify-center image w-full">
        {/* alt ={`${postinfo.title}` */}
         <img src={`http://localhost:4000/${postinfo.cover}`} alt ={postinfo.title}></img>
        </div>
       
        {/* if you want to print an html into a string you need to do a empty div with a close direclty in the same opening tag adn set the
        dangerouslySetInnerHTML to an object (which is kani = {}) includes the '__html' to be the string you want to print and in this situation it is the
        postinfo.content, since itis inside in the json file */}
        <div className="max-w-5xl -ml-[-190px] mb-28 items-center leading-7" dangerouslySetInnerHTML={{__html:postinfo.content}}/>
        </div>
    )
}