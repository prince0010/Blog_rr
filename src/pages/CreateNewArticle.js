import { useState } from 'react';
import ReactQuill from 'react-quill';
//This is to make the reactquill form as a textarea with editors
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

// Modules is comes from the reactquill in the web npm, just find the modules and the format like search it there in react-quill npm
const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

    export const CreateNewArticles = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    //Create a state when  redirecting to another path or navigate to other page or path and it must be a boolean set it to false dapat jud una
    const [redirect, setRedirect] = useState(false);
        
    async function createArticle (evt){
      evt.preventDefault();
      const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
          });
          // now it makes the navigate to other page or path as a true or available na
          if(response.ok){
            setRedirect(true);
          }
          // console.log(await response.json());
        }
        //Navigate to other page or path after inputting 
        //If setredirect is true, then it will navigate or redirect to other page or path that you've specify
        // if redirect == setRedirect japon na and then if it's true, nana which in this case is mu redirect siya sa homepage after mag input sa blog
        if(redirect){
         return <Navigate to={'/'} />
        }
        return(
     <div className=' ml-16 pt-[100px]' >
        <form onSubmit={createArticle}>
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
        onChange={evt => setFiles(evt.target.files)}
        />
        {/* adding  a package called react-quill && the command is npm install react-quill --save */}
        <div className='ml-9 w-[72rem]'>
        <ReactQuill className='overflow-hidden'
        value={content} modules ={modules} formats={formats} onChange ={newValue => setContent(newValue)}/>
        </div>
        <button className="m-auto w-[90%] grid items-center bord rounded-xl p-[6.8px] text-light bg-primaryblack transition
              ease-in-out delay-150 hover:-translate-y-1 duration-300 hover:bg-orange-300 hover:text-black"> Create Post </button>
        </form>

    </div>
)

}