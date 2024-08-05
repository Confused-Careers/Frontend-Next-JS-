import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Home = ({ formDataList, onDelete }) => {
  return (
    <div>
    <div className="flex flex-wrap sm:justify-normal justify-center gap-4 ml-auto">
      {formDataList.map((formData, index) => (
        <div key={index} className="bg-gray-700 rounded-lg sm:w-1/4 md:w-1/5 py-1 w-full hover:cursor-pointer flex sm:flex-col sm:justify-normal justify-around items-center sm:py-6">
          <Image
            src={formData.image}
            alt="Profile"
            width={60}
            height={60}
            className="sm:w-40 sm:h-40 w-16 h-16 rounded-full sm:rounded-lg mb-1"
          />
          <div className='flex flex-col justify-center items-center'>
            <p>{formData.name}</p>
            <p className="font-thin">{formData.field}</p>
          </div>
          <Link
              href={{
                pathname: '/creator',
                query: {
                  name: formData.name,
                  field: formData.field,
                }
              }}
              className="bg-gray-500 sm:hidden block hover:scale-105 text-white font-bold py-1 px-2 rounded"
            >
              View
            </Link>
          <hr className="border-gray-600 sm:block hidden w-11/12 my-2"/>
          <div className="flex gap-2">
            <Link
              href={{
                pathname: '/creator',
                query: {
                  name: formData.name,
                  field: formData.field,
                }
              }}
              className="bg-gray-500 sm:block hidden hover:scale-105 text-white font-bold py-1 px-2 rounded mt-2"
            >
              View
            </Link>
            {/* <button
              className="bg-gray-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded mt-2"
              onClick={() => onDelete(index)}
            >
              Delete
            </button> */}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Home;
