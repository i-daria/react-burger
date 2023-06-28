import React from 'react';
import styles from './burger-constructor-ingredient.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop} from 'react-dnd';
import { useDispatch } from '../../services/types/hooks';
import {MOVE_INGREDIENT, REMOVE_INGREDIENT} from '../../services/actions/ingredients';
import { TDragItem } from '../../services/types/data';

const BurgerConstructorIngredient: React.FC<TDragItem> = ({ingredient, index}) => {
  const dispatch = useDispatch();
  const ref = React.useRef<HTMLLIElement>(null);
  const [ , drop] = useDrop({
    accept: 'sortIngredient',
    collect() {},
    hover(item: TDragItem, monitor) {
      if (!ref.current) {
        return
      };
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      };
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset: any = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      };
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      };
      // Time to actually perform the action
    dispatch({
      type: MOVE_INGREDIENT,
      from: dragIndex,
      to: hoverIndex
    });
      item.index = hoverIndex;
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'sortIngredient',
    item: () => {
      return { ingredient, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const onDelete = (id: string | undefined) => {
    dispatch({
      type: REMOVE_INGREDIENT,
      id: id});
  };

  // index in li  заменили на key, убрали handlerId, проверить DND!!!!
  return (
    <li className={styles.item}  key={index} ref={ref} style={{ opacity }} > 
      <DragIcon type="primary" />        
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onDelete(ingredient.id)}
      />
    </li>
  );
};

export default React.memo(BurgerConstructorIngredient);