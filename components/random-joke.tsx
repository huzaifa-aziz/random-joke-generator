'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'

import React from 'react'

const RandomJokePage = () => {
    
    // states
    const [joke, setJoke] = useState<string>("")
    
    useEffect(() => {
        fetchJoke();
    }, [])
    // interface
    
    interface JokeResponse {
        setup: string;
        punchline: string;
    }

    
    async function fetchJoke(): Promise<void> {
        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            const data:JokeResponse = await response.json();
            setJoke(`${data.setup} - ${data.punchline}`);
        } catch (error) {
            console.log('error fetching joke', error);
            setJoke('failed to fetch a joke')
            
        }
    }
    
    
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-white to-[purple] p-4'>
        <div className='bg-white rounded-4xl shadow-lg p-8 w-full max-w-md'>
            <h1 className='text-x3l font-bold mb-4 text-[#43a047]'>Random Jokes!</h1>
            <div className='bg-blue-600 rounded-lg p-6 mb-6 text-pink-600 text-lg'>
                {joke || 'loading...'}
            </div>
            <Button onClick={fetchJoke}>Get New Joke</Button>
        </div>
    </div>
  )
}

export default RandomJokePage