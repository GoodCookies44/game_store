// Modules
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "../../api/rawg-client";
// Components
import { GameCard } from "../../components/GameCard/GameCard";
// Styles

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  if (isLoading) return <div>Загрузка...</div>;
  return (
    <div>
      {data?.results?.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
      {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
    </div>
  );
}
