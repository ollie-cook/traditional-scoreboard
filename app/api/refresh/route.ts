export async function GET() {
  const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?id=1035414';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c7a84eecc8msh642d7cec68f4b68p1ba4dajsn57c81996f610',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    },
    next: {revalidate: 0}
  };

  let result;

  try {
    const response = await fetch(url, options);
    result = await response.json();
    result = result.response[0]
  } catch (error) {
    console.error(error);
  }

  const updatedFixture = {
    id: result.fixture.id,
    home: result.teams.home.name,
    away: result.teams.away.name,
    goals: [result.goals.home, result.goals.away],
    minutes: result.fixture.status.elapsed
  }

  return Response.json(updatedFixture);
}