import {
  Trainers,
  Division,
  Rule,
  PokemonReroll,
  TimeEvent,
  Todo,
  Pokemon,
  PokemonTypes,
  TrainerMatch,
} from "@prisma/client";
import useSWR, { mutate } from "swr";

export const todoPath = "/api/todos";
export const divisionPath = "/api/division";
export const trainerPath = "/api/trainer";
export const rulePath = "/api/rules";
export const rerollPath = "/api/rerolls";
export const rerollWeekPath = "/api/rerollWeek";
export const trainerRerollPath = "/api/rerollTrainer";
export const pokemonPath = "/api/pokemon";
export const timeEventPath = "/api/timeEvent";
export const trainerMatchPath = "/api/trainerMatch";
export const timeEventTrainerMatchesPath = "/api/eventTrainerMatch";

export interface iPokemonReroll extends PokemonReroll {
  timeEvent: TimeEvent;
  prevP: Pokemon;
  newP: Pokemon;
}

export interface TrainerPokemonRerolls extends Trainers {
  PokemonRerolls: iPokemonReroll[];
}

export interface iTrainerPokemons {
  kills: number;
  typeName: string;
  pokemon: Pokemon;
}

export interface iTrainer extends Trainers {
  TrainerPokemons: iTrainerPokemons[];
  division: Division;
}

export interface iPokemon extends Pokemon {
  types: PokemonTypes[];
}

export interface iTimeEvent extends TimeEvent {
  PokemonRerolls: iTimeEventPokemonReroll[];
}

export interface iTimeEventPokemonReroll extends PokemonReroll {
  prevP: Pokemon;
  newP: Pokemon;
}

export interface TimeEventTrainerMatches extends TimeEvent {
  TrainerMatch: TrainerMatch[];
}

export interface PokemonWithTypes extends Pokemon {
  type1: string;
  type2: string;
}

export interface TrainerPokemonWithoutTrainer {
  pokemonId: number;
  typeName: string;
  kills: number;
}

export interface TrainerWithTrainerPokemons extends Trainers {
  TrainerPokemons: TrainerPokemonWithoutTrainer[];
}

/* ================================
                TODOS
================================ */
export const useTodos = () => useSWR<Todo[]>(todoPath);

export const createTodo = async (text: string) => {
  // update the local data immediately, but disable the revalidation
  mutate(
    todoPath,
    (todos: Todo[]) => [{ text, completed: false, id: "new-todo" }, ...todos],
    false
  );

  // send a request to the API to update the source
  await fetch(todoPath, {
    method: "POST",
    body: JSON.stringify({ text }),
  });

  // trigger a revalidation (refetch) to make sure our local data is correct
  mutate(todoPath);
};

export const toggleTodo = async (todo: Todo) => {
  mutate(
    todoPath,
    (todos) => todos.map((t) => (t.id === todo.id ? { ...todo, completed: !t.completed } : t)),
    false
  );

  await fetch(`${todoPath}?todoId=${todo.id}`, {
    method: "PUT",
    body: JSON.stringify({ completed: !todo.completed }),
  });

  mutate(todoPath);
};

export const deleteTodo = async (id: string) => {
  mutate(todoPath, (todos) => todos.filter((t) => t.id !== id), false);

  await fetch(`${todoPath}?todoId=${id}`, { method: "DELETE", body: "single" });

  mutate(todoPath);
};

export const deleteAllTodo = async () => {
  mutate(todoPath, (todos: Todo[]) => (todos.length = 0), false);

  await fetch(todoPath, {
    method: "DELETE",
    body: "all",
  });

  mutate(todoPath);
};

/* ================================
                Division
================================ */
export const useDivision = () => useSWR<Division[]>(divisionPath);

export const createDivsison = async (division: Division) => {
  // throw error when something is null
  if (
    !division.index ||
    !division.header ||
    !division.name ||
    !division.backgroundColor ||
    !division.borderColor
  ) {
    return "Please enter all the Forms!";
  }

  mutate(
    divisionPath,
    (divisions: Division[]) => [
      {
        index: division.index,
        header: division.header,
        name: division.name,
        backgroundColor: division.backgroundColor,
        borderColor: division.backgroundColor,
      },
      ...divisions,
    ],
    false
  );

  const response: Response = await fetch(divisionPath, {
    method: "POST",
    body: JSON.stringify(division),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.statusText}`;
    // throw new Error(message);
    return message;
  }

  mutate(divisionPath);

  return "success";
};

export const updateDivision = async (divisionId: string, division: Division) => {
  const response = await fetch(`${divisionPath}?divisionId=${divisionId}`, {
    method: "PUT",
    body: JSON.stringify(division),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.statusText}`;
    // throw new Error(message);
    return message;
  }

  mutate(divisionPath);

  return "success";
};

export const deleteDivision = async (divisionId: string) => {
  const response: Response = await fetch(`${divisionPath}?divisionId=${divisionId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.statusText}`;
    // throw new Error(message);
    return message;
  }

  mutate(divisionPath);

  return "success";
};

/* ================================
                Trainer
================================ */
export const useTrainer = () => useSWR<iTrainer[]>(trainerPath);

export const addTrainer = async (utp: TrainerWithTrainerPokemons) => {
  const response: Response = await fetch(trainerPath, {
    method: "POST",
    body: JSON.stringify(utp),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    // throw new Error(message);
    return message;
  }

  mutate(trainerPath);

  return "success";
};

export const updateTrainer = async (utp: TrainerWithTrainerPokemons, trainerName: string) => {
  const response = await fetch(`${trainerPath}?trainerName=${trainerName}`, {
    method: "PUT",
    body: JSON.stringify(utp),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.statusText}`;
    // throw new Error(message);
    return message;
  }

  mutate(trainerPath);

  return "success";
};

export const deleteTrainer = async (trainerName: string) => {
  const response: Response = await fetch(trainerPath, {
    method: "DELETE",
    body: JSON.stringify(trainerName),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.statusText}`;
    // throw new Error(message);
    return message;
  }

  mutate(trainerPath);

  return "success";
};

/* ================================
            Trainer Matches
================================ */
export const useTrainerMatches = () => useSWR<TrainerMatch[]>(trainerMatchPath);

export const useTrainerMatchesFromEvent = (event: string) =>
  useSWR<TrainerMatch[]>(`${trainerMatchPath}?event=${event}`);

export const createTrainerMatch = async (trainerMatch: TrainerMatch) => {
  const response: Response = await fetch(trainerMatchPath, {
    method: "POST",
    body: JSON.stringify(trainerMatch),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    // throw new Error(message);
    return message;
  }

  mutate(trainerMatchPath);

  return "success";
};

export const updateTrainerMatch = async (trainerMatch: TrainerMatch, event: string) => {
  const response = await fetch(trainerMatchPath, {
    method: "PUT",
    body: JSON.stringify(trainerMatch),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.statusText}`;
    // throw new Error(message);
    return message;
  }

  mutate(`${trainerMatchPath}?event=${event}`);

  return "success";
};

export const deleteTrainerMatch = async (trainerId: number, event: string) => {
  const response: Response = await fetch(`${trainerMatchPath}?trainerMatchId=${trainerId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.statusText}`;
    // throw new Error(message);
    return message;
  }

  mutate(`${trainerMatchPath}?event=${event}`);

  return "success";
};

/* ================================
                Rules
================================ */
export const useRules = () => useSWR<Rule[]>(rulePath);

export const createRule = async (rule: Rule) => {
  mutate(
    rulePath,
    (rules: Rule[]) => [{ index: rule.index, title: rule.title, text: rule.text }, ...rules],
    false
  );

  const response: Response = await fetch(rulePath, {
    method: "POST",
    body: JSON.stringify(rule),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    // throw new Error(message);
    return message;
  }

  mutate(rulePath);

  return "success";
};

export const updateRule = async (rule: Rule) => {
  const response = await fetch(rulePath, {
    method: "PUT",
    body: JSON.stringify(rule),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.statusText}`;
    // throw new Error(message);
    return message;
  }

  mutate(rulePath);

  return "success";
};

export const deleteRule = async (ruleId: number) => {
  const response: Response = await fetch(`${rulePath}?ruleId=${ruleId}`, { method: "DELETE" });

  if (!response.ok) {
    const message = `An error has occured: ${response.statusText}`;
    // throw new Error(message);
    return message;
  }

  mutate(rulePath);

  return "success";
};

/* ================================
                Rerolls
================================ */
export const useRerolls = () => useSWR<iTimeEvent[]>(rerollPath);

export const useWeekRerolls = (week: string) =>
  useSWR<iPokemonReroll[]>(`${rerollWeekPath}?week=${week}`);

export const createPokemonReroll = async (reroll: PokemonReroll) => {
  const response: Response = await fetch(rerollPath, {
    method: "POST",
    body: JSON.stringify(reroll),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    // throw new Error(message);
    return message;
  }

  mutate(rerollPath);

  return "success";
};

export const updatePokemonReroll = async (reroll: PokemonReroll) => {
  const response = await fetch(rerollPath, {
    method: "PUT",
    body: JSON.stringify(reroll),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.statusText}`;
    // throw new Error(message);
    return message;
  }

  // mutate(`${trainerMatchPath}?matchId=${matchId}`);
  mutate(`${rerollWeekPath}?week=${reroll.timeEventname}`);

  return "success";
};

export const deletePokemonReroll = async (rerollId: number, eventTime: string) => {
  const response = await fetch(`${rerollPath}?rerollId=${rerollId}`, { method: "DELETE" });

  if (!response.ok) {
    const message = `An error has occured: ${response.statusText}`;
    // throw new Error(message);
    return message;
  }

  mutate(`${rerollWeekPath}?week=${eventTime}`);

  return "success";
};

/* ================================
                TrainerRerolls
================================ */
export const useTrainerRerolls = (trainerName: string) =>
  useSWR<TrainerPokemonRerolls>(`${trainerRerollPath}?trainerId=${trainerName}`);

/* ================================
                Pokemons
================================ */
export const usePokemons = () => useSWR<iPokemon[]>(pokemonPath);

export const usePokemonsWithOrder = (orderby: string) =>
  useSWR<iPokemon[]>(`${pokemonPath}?orderby=${orderby}`);

export const createPokemon = async (pokemon: PokemonWithTypes) => {
  const response: Response = await fetch(pokemonPath, {
    method: "POST",
    body: JSON.stringify(pokemon),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    // throw new Error(message);
    return message;
  }

  mutate(pokemonPath);

  return "success";
};

export const updatePokemon = async (pokemon: PokemonWithTypes) => {
  const response: Response = await fetch(pokemonPath, {
    method: "PUT",
    body: JSON.stringify(pokemon),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.statusText}`;
    // throw new Error(message);
    return message;
  }

  mutate(pokemonPath);

  return "success";
};

export const deletePokemon = async (pokemonId: number) => {
  const response: Response = await fetch(pokemonPath, {
    method: "DELETE",
    body: JSON.stringify(pokemonId),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.statusText}`;
    // throw new Error(message);
    return message;
  }

  mutate(pokemonPath);

  return "success";
};

/* ================================
              Time Event
================================ */
export const useTimeEvent = () => useSWR<TimeEvent[]>(timeEventPath);

export const createTimeEvent = async (event: TimeEvent) => {
  const response: Response = await fetch(timeEventPath, {
    method: "POST",
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    // throw new Error(message);
    return message;
  }

  mutate(timeEventPath);

  return "success";
};

export const updateTimeEvent = async (event: TimeEvent, eventId: string) => {
  const response = await fetch(`${timeEventPath}?eventId=${eventId}`, {
    method: "PUT",
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.statusText}`;
    // throw new Error(message);
    return message;
  }

  // mutate(`${trainerMatchPath}?matchId=${matchId}`);
  mutate(timeEventPath);

  return "success";
};

export const deleteTimeEvent = async (eventId: string) => {
  const response: Response = await fetch(`${timeEventPath}?eventId=${eventId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.statusText}`;
    // throw new Error(message);
    return message;
  }

  mutate(timeEventPath);

  return "success";
};

/* ================================
  Time Event with Trainer-Matches
================================ */
export const useEventWithTrainerMatches = () =>
  useSWR<TimeEventTrainerMatches[]>(timeEventTrainerMatchesPath);

/* ================================
          Create User
================================ */
export const getUser = async (name: string, password: string) => {
  const response: Response = await fetch(`/api/user?name=${name}&password=${password}`, {
    method: "GET",
  });

  // check if an user was found. If not return an error message
  const data = response.json().catch((e) => {
    // const message = `An error has occured: ${e}`;
    return "error";
  });

  return data;
};

export const createUser = async (name: string, password: string) => {
  const user = { name: name, password: password };

  const response: Response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    // throw new Error(message);
    return message;
  }

  return "success";
};

/* ================================
  insert pokemon into db
================================ */
export const findP = async (name: string) => {
  const response: Response = await fetch(`/api/checkPokemon?name=${name}`, {
    method: "GET",
  });

  return response;
};
