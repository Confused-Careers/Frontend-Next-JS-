'use client';

import { useState, useRef } from 'react';
import Link from "next/link";
import About from '@/components/about/about';
import Chatwindow from '@/components/chatwindow/chatwindow';
import Image from 'next/image';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

function PersonalPage() {

    const settings = {
        infinite: true,
        vertical:true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
      }

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const nodeRef = useRef(null);

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'chatwindow':
        return <Chatwindow />;
      default:
        return <About />;
    }
  };



  return (
    <>
      <header> 
        <p className="sm:text-2xl p-2 flex gap-2 items-center">
            <Link href={'/'}>
            <img src='./back.svg' alt='back' className='w-8'/>
            </Link>ConfusedCareers
        </p>
        <hr className="border-gray-700"/>
      </header>

    <div className="p-4 sm:flex-row flex-col flex gap-4">
      {/* Left content */} 
      <aside className="sm:w-3/12 py-4 rounded-md bg-gray-700 sm:h-screen flex sm:flex-col justify-around sm:justify-normal sm:items-center">
        <div className=''>
        <img className=" sm:h-40 sm:w-40 h-16 w-16 rounded-full bg-white sm:rounded-lg" src="/profileChar.jpg" alt="profile" />
            
        <div className='flex flex-col justify-center items-center'>
            <p className="text-xl font-semibold">Name</p>
            <p className="text-md font-light">Field</p>
        </div>
        </div>
        <div className="flex my-8 gap-5">
          <img className="h-8 w-8" src="/instagram.png" alt="profile" />
          <img className="h-8 w-8" src="/twitter.png" alt="profile" />
          <img className="h-8 w-8" src="/linkedin.png" alt="profile" />
        </div>

        {/* <button class="bg-orange-700 text-white border border-orange-200 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
            <span class="bg-orange-600 shadow-orange-600 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            Talk to my AI
        </button> */}
      </aside>

      {/* Middle content */}
      <div className="sm:w-6/12 bg-gray-700 h-screen relative rounded-md">
        <div className="flex justify-between">
          {/* <p className="text-2xl m-auto">{activeSection.toUpperCase()}</p> */}
          <nav className="flex gap-12 bg-yellow-100 text-gray-700 py-4 rounded-md w-full justify-center z-50">
            <button className={`${activeSection === 'about' ? 'underline underline-offset-8 decoration-2 decoration-gray-700' : 'text-gray-700 transition-all duration-1000 ease-out'}`} onClick={() => setActiveSection('about')}>About</button>
            <button className={`${activeSection === 'chatwindow' ? 'underline underline-offset-8 decoration-2 decoration-gray-700' : 'text-gray-700 transition-all duration-1000 ease-out'}`} onClick={() => setActiveSection('chatwindow')}>Conversation</button>
          </nav>
        </div>
        <div className="p-8">
        <TransitionGroup>
            <CSSTransition
              key={activeSection}
              timeout={200}
              classNames="fade"
            >
              <div ref={nodeRef}>{renderSection()}</div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
      
      {/* Ad section  */}
      <div className="sm:w-3/12 sm:flex sm:flex-col hidden items-center">
          <div className="w-10/12 h-screen">
            <Slider {...settings}>
              {brandData.map((e) => (
                  <div id={e.id} className="border-gray-600 bg-gray-600 border my-4 rounded-md p-4 shadow-sm transition-transform transform hover:scale-105 cursor-pointer">
                  <img className="h-20 mx-auto" src={e.img} alt="img" />
                  {/* <hr className="border-t-1 border-gray-100" /> */}
                  <p className="my-4 underline underline-offset-4 decoration-gray-200 decoration-2 flex justify-center">{e.content}</p>
                </div>
              ))

            }
            </Slider>
          </div>
        </div>

    </div>
  </>
  );
}

const brandData = [
    {
        img : "./hm.png", 
        content: 'H&M',
        id: '1'
    },
    {
        img : "./amazon.png", 
        content: 'Amazon',
        id: '2'
    },
    {
      img : "./myntra.png", 
      content: 'Myntra',
      id: '3'
    },
  ]

export default PersonalPage;
