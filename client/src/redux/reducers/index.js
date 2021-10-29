import { order } from "../../utils/index";
import * as type from "../types/index";

const initialState = {
  allPokemons: [],
  pokemons: [],
  types: [],
  detail: {},
  isLoading: false,
  error: {
    status: false,
    message: null,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_POKEMONS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case type.GET_POKEMONS_SUCCESS:
      return {
        ...state,
        allPokemons: action.payload,
        pokemons: action.payload,
        isLoading: false,
      };

    case type.GET_POKEMONS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: {
          status: true,
          message: action.payload,
        },
      };

    case type.GET_TYPES:
      const types = state.types.length > 0 ? state.types : action.payload;
      return {
        ...state,
        types: types,
      };

    case type.GET_BY_NAME:
      const pokemonFound = !action.payload.length
        ? (action.payload[0] = null)
        : action.payload;
      return {
        ...state,
        pokemons: pokemonFound,
      };

    case type.GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case type.POST_POKEMON:
      return {
        ...state,
      };

    // Order and filter
    case type.ORDER:
      return {
        ...state,
        pokemons: order(state, action.payload),
      };

    case type.FILTER_BY_TYPE:
      const allPokemons = state.allPokemons;
      const typeFilter =
        action.payload === "allTypes"
          ? allPokemons
          : allPokemons.filter(({ types }) => {
              return types.find(({ name }) => name === action.payload);
            });
      return {
        ...state,
        pokemons: typeFilter,
      };

    case type.FILTER_CREATED:
      const allPokemonsFilter = state.allPokemons;
      let createdFilter;
      if (action.payload === "all") {
        createdFilter = allPokemonsFilter;
      }
      if (action.payload === "created") {
        createdFilter = allPokemonsFilter.filter((elem) => elem.createdInDb);
      }
      if (action.payload === "api") {
        createdFilter = allPokemonsFilter.filter((elem) => !elem.createdInDb);
      }
      return {
        ...state,
        pokemons: createdFilter,
      };

    default:
      return state;
  }
};

export default rootReducer;
