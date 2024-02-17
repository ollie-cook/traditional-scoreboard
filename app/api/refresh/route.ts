export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?id=' + id;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.FOOTBALL_API_KEY || "",
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

  console.log('HELLO')
  console.log(result)

  const updatedFixture = {
    id: result?.fixture.id,
    home: result?.teams.home.name,
    away: result?.teams.away.name,
    goals: [result?.goals.home, result?.goals.away],
    minutes: result?.fixture.status.elapsed
  }

  return Response.json(updatedFixture);
}