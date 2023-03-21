import ReactQuill from 'react-quill';


const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };
  

  //we need two props the value and onChange
export const EditPostComp = ({value, onChange}) => {
    return(
        <div className='ml-9 w-[72rem] astyle'>
        <ReactQuill 
         className='overflow-hidden'
         value={value} 
         theme ={'snow'}
         onChange ={onChange}
         modules ={modules}
         />
        </div>
    )

}