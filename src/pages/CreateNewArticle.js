import { useState } from 'react';
import ReactQuill from 'react-quill';
//This is to make the reactquill form as a textarea with editors
import 'react-quill/dist/quill.snow.css';

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
    // Modules is comes from the reactquill in the web npm, just find the modules and the format like search it there in react-quill npm

        return(
     <div className=' ml-16 pt-[100px]' >
        <form>
        <input type = 'title' placeholder={'Title'} value = {title} onChange = {evt => setTitle(evt.target.value)}/>
        <input type ='summary' placeholder={'Suummary'} value = {summary} onChange = {evt => setSummary(evt.target.value)}/>
        <input type ='file'/>
        {/* adding  a package called react-quill && the command is npm install react-quill --save */}
        <div className='ml-9 w-[72rem]'>
        <ReactQuill value={content} modules ={modules} formats={formats} onChange ={newValue => setContent(newValue)}/>
        </div>
        <button className="m-auto w-[90%] grid items-center bord rounded-xl p-[6.8px] text-light bg-primaryblack transition
              ease-in-out delay-150 hover:-translate-y-1 duration-300"> Create Post </button>
        </form>

    </div>
)

}