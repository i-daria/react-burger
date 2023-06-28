//открыть/закрыть модальное окно
export const SHOW_MODAL: 'SHOW_MODAL' = 'SHOW_MODAL';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';

interface IShowModal {
  readonly type: typeof SHOW_MODAL,
}
interface ICloseModal {
  readonly type: typeof CLOSE_MODAL,
}


export type TModalActions = | IShowModal | ICloseModal;