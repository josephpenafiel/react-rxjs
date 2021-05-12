import { useState } from "react";
import { BehaviorSubject, from } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  mergeMap,
} from "rxjs/operators";
import "./App.css";
import { useObservable } from "./hooks/custom";
import { getPokemonByName } from "./services/pokemon";

const searchSubject$ = new BehaviorSubject("");
const searchResult$ = searchSubject$.pipe(
  filter((v) => v.length > 2),
  debounceTime(800),
  distinctUntilChanged(),
  mergeMap((v) => from(getPokemonByName(v)))
);

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  useObservable(searchResult$, setResults);
  const handleSearch = (e: any) => {
    const newValue = e.target.value;
    setSearch(newValue);
    searchSubject$.next(newValue);
  };
  return (
    <div className="App">
      <input
        type="text"
        placeholder="search..."
        value={search}
        onChange={handleSearch}
      />
      <p>{search}</p>
      <div>{JSON.stringify(results, null, 2)}</div>
    </div>
  );
}

export default App;
