import { type Fixture } from '@/app/utils/types'
import FormAndScoreBoard from './components/FormAndScoreBoard'

//force redeployment

export default async function Home() {
  const todaysFixtures = await getTodaysFixtures();

  return (
    <main className="min-h-screen">
      <FormAndScoreBoard fixtures={todaysFixtures} />
    </main>
  );
}

const getTodaysFixtures = async () => {
  const apiKey = process.env.FOOTBALL_API_KEY;

  const premierLeagueFixtures = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?date=2024-02-17&league=39&season=2023';
  const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': apiKey || "",
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    },
    next: {revalidate: 0}
  }

  const fixtureList: Fixture[] = []
  let result;
  
  try {
    const response = await fetch(premierLeagueFixtures, options);
    result = await response.json();
  } catch (error) {
    console.error(error);
  }

  result.response.forEach((fixture: any) => {
    fixtureList.push({
      id: fixture.fixture.id,
      home: fixture.teams.home.name,
      away: fixture.teams.away.name,
      goals: [fixture.goals.home, fixture.goals.away],
      minutes: fixture.fixture.status.elapsed
    })
  })

  return fixtureList;
}
