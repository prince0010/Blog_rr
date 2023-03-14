import first from '../assets/example.jpg'


export const Contententries = () => {
    return(
      // 1540
      <div className=' m-auto pt-[90px] -mb-24 -ml-[320px] h-full' >
      <div className="p-[19px] max-w-[1840px] m-auto w-screen h-full md:ml-60">
                  {/* // <div className="p-[9px] max-w-[1240px] m-auto pt-[130px] -mb-32 -ml-24"> */}
              {/* post is a customized className in the App.css */}
                <div className=" grid grid-cols-2 px-72 gap-5 items-center">
                  <div className = "image ">
              <img
              className='max-w-full w-64 m-auto mr-3 sm:w-64 sm:ml-28 md:max-w-full md:w-64 md:ml-28 ' 
              src={first} alt="Title"></img>
                     </div>
                     {/* w-[400px] */}
                     <div className="sm:ml-20 sm:w-96 -mr-36">
                <h2 className='font-bold text-2xl mt-6  '>Full-House Battery backup coming later this year</h2>
                <p className = 'info mt-[6px] text-[#888] text-[.7rem] font-bold flex gap-3'>
                  <a className = 'author text-primaryblack' href='/'> Prince Nagac</a>
                  <time> 03-11-2023 23:20</time>
                   </p>
                <p className=" summary text-l py-3 my-[10px] leading-6  ">  Today at its special event, home backup power giant EcoFlow launced a flurry of new products, including a 'Whole home Backup Power Solution'
                Today at its special event, home backup power giant EcoFlow launced a flurry of new products, including a 'Whole home Backup Power Solution'
                Today at its special event, home backup power giant EcoFlow launced a flurry of new products, including a 'Whole home Backup Power Solution' </p>
                </div>
                </div>
                </div>
                </div>
    )


}
