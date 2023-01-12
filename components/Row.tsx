import { useRef, useState } from "react";
import { Movie } from "../typing";
import Thumbnail from "./Thumbnail";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { DocumentData } from "firebase/firestore";

interface Props {
  title: string
  movies: Movie[] | DocumentData[]
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="relative group md:-ml-2">
        <ChevronLeftIcon onClick={() => handleClick("left")} className="w-9 h-9 absolute top-0 bottom-0 left-2 z-30 m-auto cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"  />
        <div
          ref={rowRef}
          className="flex items-center space-x-0.5  overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon onClick={() => handleClick("right")}  className="w-9 h-9 absolute top-0 bottom-0 right-2 z-30 m-auto cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 "  />
      </div>
    </div>
  );
}

export default Row;
