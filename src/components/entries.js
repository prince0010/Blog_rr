import { format } from 'date-fns'
import { Link } from 'react-router-dom'

//ang (title, summary,content, cover, createdAt) mao ni gikan sa json na naa sa response makita pag iinspect og ang 4 is gikan sa Post.js na model
export const Contententries = ({_id, title, summary,content, cover, createdAt, author}) => {
    return(
      // 1540
      <div className=' m-auto pt-[90px] -mb-24 -ml-[320px] h-full' >
      <div className="p-[19px] max-w-[1840px] m-auto w-screen h-full md:ml-60">
                  {/* // <div className="p-[9px] max-w-[1240px] m-auto pt-[130px] -mb-32 -ml-24"> */}
              {/* post is a customized className in the App.css */}
                <div className=" grid grid-cols-2 px-72 gap-5 items-center">
                  <div className = "image ">
                    <Link to ={`/post/${_id}`}>
              <img
              className='max-w-full w-64 m-auto mr-3 sm:w-64 sm:ml-28 md:max-w-full md:w-64 md:ml-28 ' 
              src={'http://localhost:4000/'+ cover} alt="Title"></img>
                    </Link>
                     </div>
                     {/* w-[400px] */}
                     <div className="sm:ml-20 sm:w-96 -mr-36">
                     {/* backtick /posts/${_id} the endpoit of posts is from the endpoint of posts which contains the data or info of the posts including the id of the image or files, and the _id it is from the database which in the database the id is _id 
                      and it is an _id of the image file, the every image has contain an id */}
                     <Link to ={`/post/${_id}`}> 
                    <h2 className='font-bold text-2xl mt-6  '>
                                {title}
                      </h2>
                     </Link>
                <p className = 'info mt-[6px] text-[#888] text-[.7rem] font-bold flex gap-3'>
                  {/* {author.username} this is to call the username from the json of the poster of the blog which is from the endpoint of '/posts' and '/post' */}
                  <a className = 'author text-primaryblack' href='/'>
                    {author.username} 
                    </a>
                  <time>{format(new Date(createdAt), 'MMM dd, yyyy HH:mm')}</time>
                   </p>
                <p className=" summary text-l py-3 my-[10px] leading-6">  
                                  {summary} 
                </p>
                </div>
                </div>
                </div>
                </div>
    )


}
