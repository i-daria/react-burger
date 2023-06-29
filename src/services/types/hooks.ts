import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";
import { AppDispatch, AppThunk, RootState } from "./index";

// хук знает структуру хранилища
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// Хук не даст отправить экшен, который ему не знаком
type TUseDispatch = () => AppDispatch | AppThunk;
export const useDispatch: TUseDispatch = dispatchHook;
