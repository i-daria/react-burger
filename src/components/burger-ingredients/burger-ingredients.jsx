import React from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from '../ingredient-category/ingredient-category';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import {RESET_CURRENT_INGREDIENT, CLOSE_MODAL} from '../../services/actions/actions';
import { useInView } from 'react-intersection-observer';

const BurgerIngredients = () => { 
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = React.useState('buns');
  const ingredients = useSelector(store => store.ingredients.ingredients); 
  const buns = ingredients.filter((item) => item.type === 'bun');
  const sauces = ingredients.filter((item) => item.type === 'sauce'); 
  const mains = ingredients.filter((item) => item.type === 'main'); 
  const modalIsOpen = useSelector(store => store.modal.isOpen);
  
  const handlerClick = (tab) => {
    setCurrentTab(tab);    
    const el = document.getElementById(tab);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    } 
  }

  const closeModal = () => {
    dispatch({type: RESET_CURRENT_INGREDIENT});
    dispatch({type: CLOSE_MODAL});
  };

// настройки
let options = {
  threshold: 0.55
};
// функция обратного вызова
let callback = function(entries, observer){
  entries.forEach(entry => {    
    if(entry.isIntersecting && entry.intersectionRatio >= 0.55) {
      setCurrentTab(entry.target.id);
    }
  });
};
// наблюдатель
let observer = new IntersectionObserver(callback, options);
let targets = document.querySelectorAll('.category-title');
targets.forEach(target => {
  observer.observe(target);
});


  return (
    <>
      <section className={styles.section}>
        <nav className={styles.nav}>
          <Tab value="buns" active={currentTab === 'buns'} onClick={handlerClick}>
            Булки
          </Tab>
          <Tab value="sauces" active={currentTab === 'sauces'} onClick={handlerClick}>
            Соусы
          </Tab>
          <Tab value="mains" active={currentTab === 'mains'} onClick={handlerClick}>
            Начинки
          </Tab>      
        </nav>
        <div className={styles.content} id="scrollBlock">
          <IngredientCategory id='buns' title='Булки' items={buns} />
          <IngredientCategory id='sauces' title='Соусы' items={sauces} />        
          <IngredientCategory id='mains' title='Начинки' items={mains} />
        </div>
      </section>   
      { modalIsOpen &&
      <Modal title='Детали ингредиента' onClose={closeModal}>
        <IngredientDetails />
      </Modal>
      }
    </> 
  );
}

export default BurgerIngredients;