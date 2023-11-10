import { subscribe, dispatch } from "./Model/store.js";
import { add, subtract, reset } from "./Model/actions.js";

subscribe((_, next) => console.log(next));

dispatch(add());
dispatch(add());
dispatch(subtract());
dispatch(reset());
