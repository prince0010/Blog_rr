import { useEffect, useState } from "react"
import { Contententries } from "../components/entries";

export const IndexPage = () => {
    const [postsI, setPosts] = useState([]);
   // Mount the homepage so when we Mount this will run the function 'the useEffect'
   useEffect(() => {
      //since its async function you can either use the async and await function but i used here is .then
      //the response.json or the json that we get from response will have all the posts or content for the homepage and this json is async function as well so i used 'then' 
      fetch('http://localhost:4000/post').then(response => {
         response.json().then(posts => {
           setPosts(posts);
         });
   });
   }, []);
    return(
       <>
      {/* if posts  */}
      {postsI.length > 0 && postsI.map(postscntn => (
         // Pass all the properties of components in contentetries like this '{...postscntn}' which is naa na sa entries.js
         <Contententries {...postscntn} />
         ))}
        
       </>

    )   

}