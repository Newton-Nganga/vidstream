

import InnerPage from '@/components/InnerPages/InnerPages'
import user from "@assets/images/user.png";

type ListingElProps={
    fieldname:string
}
const ListingEl=({fieldname}:ListingElProps)=>{
  return(
    <div className='w-full flex flex-col bg-[#081523] rounded-xl mt-2 p-4'>
    <div className='w-[70vw] mx-auto'>
      <p className='text-3xl font-semibold underline underline-offset-[10px]'>{fieldname}</p>  
      <table className='w-full mt-4 text-left rounded-lg'>
        <thead className='bg-[#050d16]'>
            <tr >
            <th className='p-2 py-3'>Title</th>
            <th className='p-2 py-3'>Type</th>
            <th className='p-2 py-3'>visit</th> 
            </tr>
        </thead>
        <tbody className='my-2 bg-[#01030541]'>
            <tr>
              <td className='p-2'>The Meg 2</td>
              <td className='p-2'>Movie</td>
              <td className='p-2'><a href="" className='text-blue-400'>view</a></td>
            </tr>
            <tr>
              <td className='p-2'>Spartacus season 2</td>
              <td className='p-2'>show</td>
              <td className='p-2'><a href="" className='text-blue-400'>view</a></td>
            </tr>
            <tr>
              <td className='p-2'>The Meg 2</td>
              <td className='p-2'>Movie</td>
              <td className='p-2'><a href="" className='text-blue-400'>view</a></td>
            </tr>
        </tbody>
        <tfoot className='bg-[#050d16]'>
            <tr>
                <td colSpan={3} className='p-2 pr-0 text-right'>
                    <a className='w-fit px-4 py-2 bg-blue-500 hover:text-white'>Manage {fieldname}</a>
                </td>
            </tr>
        </tfoot>
      </table>
    </div>
    </div>
  )
}

export default function AccountPage() {
  return (
    <InnerPage title='My Account'>
     <section className='section'>
      <div className='inner-section '>
        <div className='w-full bg-[#081523] rounded-xl p-4'>
            <div className='flex items-center gap-4 max-w-[400px] mx-auto'>
                <div className='rounded-full h-[150px] w-[150px] '>
                    <img src={user} alt='user'/></div>
                <div>
                    <p>Name : John Doe</p>
                    <p>Email : johndoe@gmail.com</p>
                </div>
            </div>
        </div>
       <ListingEl fieldname='Favourites'/>
       <ListingEl fieldname='Watchlist'/>
       <article className='w-full bg-[#081523] mt-8 border rounded-md border-red-600 p-4'>
         <div className='text-center max-w-[600px] mx-auto'>
            <p> Caution!! This action is irreversible and you wanna be sure before you proceed with deletion.Get rid of this account</p>
            <button className='w-fit my-4'>
                Delete My Account
            </button>
         </div>
       </article>
      </div>
     </section>
    </InnerPage>
  )
}