export const CreateNewArticles = () => {
return(
     <div className='ml-20 pt-[100px]' >
        <form>
        <input type = 'title' placeholder={'Title'} />
        <input type ='summary' placeholder={'Summary'} />
        <input type ='file' />
        {/* adding  a package called react-quill && the command is npm install react-quill --save */}
        <textarea name ="" id="" cols = "30" rows= "10"></textarea>
        </form>

    </div>
)

}