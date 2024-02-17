
import { type Fixture } from '@/app/utils/types'
import { digitalFont } from '@/app/fonts/fonts'

export default function ScoreBoard({ fixture } : { fixture: Fixture | undefined }) {
  return (
    <div className="flex flex-col w-11/12 lg:w-5/6 xl:w-2/3">
      <div className="flex w-full justify-between">
        <p className={`text-[#ff7b24] text-5xl lg:text-7xl xl:text-9xl ${digitalFont.className}`}>{fixture?.home}</p>
        <p className={`text-[#ff7b24] text-5xl lg:text-7xl xl:text-9xl ${digitalFont.className}`}>{fixture?.goals[0]}</p>
      </div>
      <div className="flex w-full justify-between">
        <p className={`text-[#ff7b24] text-5xl lg:text-7xl xl:text-9xl ${digitalFont.className}`}>{fixture?.away}</p>
        <p className={`text-[#ff7b24] text-5xl lg:text-7xl xl:text-9xl ${digitalFont.className}`}>{fixture?.goals[1]}</p>
      </div>
      <p className={`text-[#ff7b24] lg:text-4xl xl:text-6xl ${digitalFont.className}`}>{fixture?.minutes} mins</p>
    </div>
  )
}
