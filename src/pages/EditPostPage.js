import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { EditPostComp } from '../components/EditPost';


export const EditPost = () => {
    // when we want to enter the edit post page we want to grab the ID from params
    const {id} = useParams();    
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    //Create a state when  redirecting to another path or navigate to other page or path and it must be a boolean set it to false dapat jud una
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
            fetch('http://localhost:4000/post/'+id).then(response => {
                response.json().then(postInfo => {
                setTitle(postInfo.title);
                   setSummary(postInfo.summary);
                   setContent(postInfo.content);

                });
            });
    }, [id]);
    // we will add async function to know if its updated or not
   async function updatingPost(evt){
        evt.preventDefault();
        const append = new FormData();
        append.set('title', title);
        append.set('summary', summary);
        append.set('content', content);
        append.set('id', id);
        // add a question mark and dot in the files if incase this is not a array of files 
        //if we have a files of zero then we can add a file to the data
        if(files?.[0]){
            append.set('file', files?.[0]);
        }
        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: append,
            credentials: 'include',
          });
        if(response.ok)
        {
        setRedirect(true);
        }
    }
    //if redirect is true then we will redirect to the post location that we have updated 
    if(redirect){
        return <Navigate to={'/post/'+id} />
    }
    return(
     <div className=' ml-16 pt-[130px]' >
        <form onSubmit={updatingPost}>
        <input className='border border-black shadow-lg p-3 rounded-md  hover:outline-none hover:border-orange-300'
         type = 'title'
          placeholder={'Title'}
           value = {title}
            onChange = {evt => setTitle(evt.target.value)}
            />
        <input className='border border-black shadow-lg p-3 rounded-md hover:outline-none hover:border-orange-300'
          type ='summary'
          placeholder={'Summary'}
          value = {summary}
           onChange = {evt => setSummary(evt.target.value)}
           />
        <input className='border border-black shadow-lg p-3 rounded-md hover:outline-none hover:border-orange-300'
        type ='file' 
        // value={cover}
        onChange={evt => setFiles(evt.target.files)}
        />
        {/* adding  a package called react-quill && the command is npm install react-quill --save */}
        <EditPostComp value ={content} onChange = {setContent} />
        <button className="m-auto w-[90%] grid items-center bord rounded-xl p-[6.8px] text-light bg-primaryblack transition
              ease-in-out delay-150 hover:-translate-y-1 duration-300 hover:bg-orange-300 hover:text-black"> Create Post </button>
        </form>

    </div>
    )
}