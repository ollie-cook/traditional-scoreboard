'use client'

import { type Fixture } from '@/app/utils/types'
import { useState } from 'react'

export default function FormAndScoreBoard({ fixtures }: { fixtures: Fixture[] }) {
  const [fixtureState, setFixtureState] = useState<Fixture | undefined>(fixtures[0] || undefined)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFixture = fixtures.find((fixture) => fixture.id === Number(event.target.value))
    setFixtureState(selectedFixture)
  }

  return (
    <div>
      <div className="w-full flex justify-center py-4">
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
      </div>
      <div className="h-screen bg-black">
        <p className="text-white">{fixtureState?.home}</p>
        <p className="text-white">{fixtureState?.away}</p>
        <p className="text-white">{fixtureState?.goals[0]}</p>
        <p className="text-white">{fixtureState?.goals[1]}</p>
        <p className="text-white">{fixtureState?.minutes}</p>
      </div>
    </div>
  )
}