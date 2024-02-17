'use client'

import { type Fixture } from '@/app/utils/types'
import { useEffect, useState } from 'react'
import ScoreBoard from './ScoreBoard'


export default function FormAndScoreBoard({ fixtures }: { fixtures: Fixture[] }) {
  const [fixtureState, setFixtureState] = useState<Fixture | undefined>(fixtures[0] || undefined)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFixture = fixtures.find((fixture) => fixture.id === Number(event.target.value))
    setFixtureState(selectedFixture)
  }

  useEffect(() => {
    const timer = setInterval(async () => {
      console.log('score last refreshed at ' + new Date())
      refreshFixture()
    }, 60000);
    
  
    // Clear interval on component unmount
    return () => {
      clearInterval(timer);
    };
  }, [fixtureState]);

  const refreshFixture = async () => {
    const newFixture = await refreshScore(fixtureState?.id);
    setFixtureState(newFixture)
  }

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center py-4">
        <form className="flex flex-col items-start">
          <label className="text-sm">Select fixture</label>
          <select 
            className="border border-black rounded-md"
            value = {fixtureState?.id || ""}
            onChange = {handleChange}
          >
            {fixtures.map((fixture) => (
              <option key={fixture.id} value={fixture.id}>
                {fixture.home} vs {fixture.away}
              </option>
            ))}
          </select>
        </form>
        <p className="mt-4">Scroll down to make score board full screen</p>
      </div>
      <div className="h-screen w-full flex justify-center items-center bg-black">
        <ScoreBoard fixture={fixtureState} />
      </div>
    </div>
  )
}

const refreshScore = async (id: number | undefined) => {
  const result = await fetch('/api/refresh?fixtureId='+id)
  const data = await result.json()
  console.log(data)

  return data
}