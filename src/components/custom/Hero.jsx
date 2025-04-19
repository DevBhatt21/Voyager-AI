import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="flex flex-col items-center mx-57 gap-9">
      <h1
      className="font-extrabold text-[50px] text-center mt-16">
        <span className='text-[#3b82f6]'>Say Hello to your next travel plans with AI:</span> <br></br> Personalized Itineraries at Your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>This is your own planner and travel advisor now just with a click</p>
        <Link to={'/create-trip'}>
          <Button>Get Started, It's Free.</Button>
        </Link>
        
    </div>
  )
}

export default Hero
