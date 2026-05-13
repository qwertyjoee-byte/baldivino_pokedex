export default async function Home() {
  // 1. Fetching the list of Pokemon (limit to 20 for now)
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const data = await response.json();

  // 2. fetch its indiv details for each Pokemon
  const detailedPokemon = await Promise.all(
    data.results.map(async (p: { url: string }) => {
      const res = await fetch(p.url);
      return res.json();
    })
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-8 uppercase tracking-widest">
        Pokedex API Lab
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {detailedPokemon.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white p-6 rounded-2xl shadow-lg border-b-8 border-red-500 hover:scale-105 transition-all"
          >
            {/* Image */}
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-32 h-32 mx-auto"
            />
            
            <h2 className="font-black text-2xl uppercase mt-2 text-slate-800">
              {pokemon.name}
            </h2>
            
            <div className="mt-4 flex justify-between text-sm font-medium bg-slate-50 p-3 rounded-lg">
              {/* Height */}
              <p className="text-blue-600">Height: {pokemon.height}</p>
              {/* Weight */}
              <p className="text-green-600">Weight: {pokemon.weight}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}