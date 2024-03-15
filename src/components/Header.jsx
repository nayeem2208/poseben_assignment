import appLogo from '../../public/appLogo.png'
import bulkEmail from '../../public/bulkemail1.png'
import verified from '../../public/protect.png'
import email from '../../public/email.png'
import drawer from '../../public/drawer.png'
import APi from '../../public/Ellipse 5.png'
import { IoIosArrowDown } from "react-icons/io";
function Header() {
  return (
    <div className='flex h-16 shadow-lg bg-white justify-between items-center px-8'>
      <div className=' w-1/6 '>
        <img src={appLogo} alt="hello" className='' />
      </div>
      <div>
        <ul className='flex text-slate-800'>
            <li className='flex h-full items-center hover:bg-gray-100 rounded-lg py-1'><img src={bulkEmail} alt="" className='w-9 mx-2 ' /><p className='mr-3'>Bulk</p></li>
            <li className='flex items-center hover:bg-gray-100 rounded-lg py-1'><img src={verified} alt="" className='w-9 mx-2' /><p className='mr-3'>Monitor</p></li>
            <li className='flex items-center hover:bg-gray-100 rounded-lg py-1'><img src={email} alt="" className='w-9 mx-2' /><p className='mr-3'>Single</p></li>
            <li className='flex items-center hover:bg-gray-100 rounded-lg py-1'><img src={drawer} alt="" className='w-9 mx-2' /><p className='mr-3'>Deliverability</p></li>
            <li className='flex items-center hover:bg-gray-100 rounded-lg py-1'><img src={APi} alt="" className='w-9 mx-2' /><p className='mr-3'>API</p></li>
            <li><button className='bg-indigo-200 text-indigo-600 py-2 px-4 rounded-lg font-semibold mx-3'>BUY CREDITS</button></li>
            <li><div className='w-10 h-10 bg-indigo-500 rounded-full flex justify-center items-center text-white font-semibold'><p>N</p></div></li>
            <li><IoIosArrowDown className='mt-3 mx-1'/></li>
        </ul>
      </div>
    </div>
  )
}

export default Header

