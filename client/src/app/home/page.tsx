import Chatbot from '@/components/ChatBot'
import HomeComponent from '@/components/HomeComponent'
import LocationComponent from '@/components/LocationComponent'
import React from 'react'

const Home = () => {
  return (
    <div>
      <HomeComponent/>
      <Chatbot/>
      <LocationComponent/>
    </div>
  )
}

export default Home
