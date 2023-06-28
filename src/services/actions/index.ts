import { TIngredientsActions } from "./ingredients";
import { TModalActions } from "./modal";
import { TOrderActions } from "./order";
import { TProfileActions } from "./profile";
import { TWsActions } from "./ws-actions";
import { TWsAuthActions } from "./ws-actions-auth";


export type TAppActions = 
  | TIngredientsActions
  | TOrderActions
  | TModalActions
  | TProfileActions
  | TWsAuthActions
  | TWsActions;