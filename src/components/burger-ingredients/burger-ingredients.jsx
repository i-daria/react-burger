import React from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from '../ingredient-category/ingredient-category';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from "prop-types";
import { ingredientPropTypes } from '../../utils/prop-types';

const BurgerIngredients = ({ingredients}) => { 
  const [currentTab, setCurrentTab] = React.useState('buns');

  const buns = ingredients.filter((item) => item.type === 'bun');
  const sauces = ingredients.filter((item) => item.type === 'sauce'); 
  const mains = ingredients.filter((item) => item.type === 'main'); 
  
  const handlerClick = (tab) => {
    setCurrentTab(tab);    
    const el = document.getElementById(tab);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    } 
  }

  const [modalData, setModalData] = React.useState(null);
  const closeModal = () => {
    setModalData(null);
  };

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
        <div className={styles.content}>
          <IngredientCategory id='buns' title='Булки' items={buns} onItemClick = {setModalData}/>
          <IngredientCategory id='sauces' title='Соусы' items={sauces} onItemClick = {setModalData}/>        
          <IngredientCategory id='mains' title='Начинки' items={mains} onItemClick = {setModalData}/>
        </div>
      </section>   
      { modalData &&
      <Modal title='Детали ингредиента' onClose={closeModal}>
        <IngredientDetails 
          ingredient={modalData}
        />
      </Modal>
      }
    </> 
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}

export default BurgerIngredients;