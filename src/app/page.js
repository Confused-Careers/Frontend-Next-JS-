'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SearchBar from "@/components/search/searchbar";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from "@/components/home/home";
import Add from "@/components/add/add";
import RegisterForm from "@/components/register/register";
import LoginForm from "@/components/login/login";
import LogoutForm from "@/components/logout/logout";

export default function Page() {
  const [activeTab, setActiveTab] = useState('home');
  const [formDataList, setFormDataList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const homeNodeRef = useRef(null);
  const addNodeRef = useRef(null);

  useEffect(() => {
    const savedFormData = localStorage.getItem('formDataList');
    if (savedFormData) {
      setFormDataList(JSON.parse(savedFormData));
    }
  }, []);

  const handleFormSubmit = (data) => {
    const newFormDataList = [...formDataList, data];
    setFormDataList(newFormDataList);
    localStorage.setItem('formDataList', JSON.stringify(newFormDataList));
    setActiveTab('home');
  };

  // const handleDelete = (index) => {
  //   const newFormDataList = formDataList.filter((_, i) => i !== index);
  //   setFormDataList(newFormDataList);
  //   localStorage.setItem('formDataList', JSON.stringify(newFormDataList));
  // };

  const renderSection = () => {
    switch (activeTab) {
      case 'home':
        return <Home formDataList={formDataList} />;
      case 'add':
        return <Add onSubmit={handleFormSubmit} />;
      default:
        return <Home />;
    }
  };

  
  return (
    <>
      <header className="flex justify-between items-center">
        <p className="sm:text-2xl p-2">ConfusedCareers</p>
        <div className="flex">
          <RegisterForm/>
          {isLoggedIn ? (
            <LogoutForm onLogout={() => setIsLoggedIn(false)} />
          ) : (
            <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />
          )}
        </div>
      </header>

      <hr className="border-gray-700"/>

      <main className="flex gap-4 m-3">
        <aside className="flex flex-col gap-3">
          <button className={`${activeTab === 'home' ? 'bg-gray-700 rounded-lg p-1' : ''}`} onClick={() => setActiveTab('home')}>
            <div className="flex flex-col text-xs items-center w-12 h-12 justify-center">
              <Image
                src="/home.svg"
                alt="Home"
                width={36}
                height={36}
                className="sm:w-full w-8/12 h-4/6"
              />
              <span>Home</span>
            </div>
          </button>
          <button className={`${activeTab === 'add' ? 'bg-gray-700 rounded-lg p-1' : ''}`} onClick={() => setActiveTab('add')}>
            <div className="flex flex-col text-xs items-center w-12 h-12 justify-center">
              <Image
                src="/add.svg"
                alt="Add"
                width={36}
                height={36}
                className="sm:w-full w-6/12 h-3/6"
              />
              <span>Add</span>
            </div>
          </button>
        </aside>

        <div className="w-full">
          <div>
            <SearchBar />
          </div>
          <div className="my-2">
            <TransitionGroup>
              <CSSTransition
                key={activeTab}
                nodeRef={activeTab === 'home' ? homeNodeRef : addNodeRef}
                timeout={200}
                classNames="fade"
              >
                <div className="transition-all duration-300" ref={activeTab === 'home' ? homeNodeRef : addNodeRef}>{renderSection()}</div>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      </main>
    </>
  );
}
