// Modules
import React from 'react'
import { Title, Tabs } from '@mantine/core'
// Components
// Styles
import * as classes from './Header.module.css';


export default function Header() {
  return (
  <header>
    <section className={classes.header__disclaimer}>
      <Title order={2}>Этот сайт создан с использованием API <a href='https://rawg.io/' 
        target="_blank" 
        rel='nofollow noopener noreferrer'>RAWG.io</a>
      </Title>
    </section>
    <section>
    <Tabs defaultValue="Новинки" >
      <Tabs.List>
        <Tabs.Tab value='Новинки'>Новинки</Tabs.Tab>
        <Tabs.Tab value='Игры года'>Игры года</Tabs.Tab>
        <Tabs.Tab value='Новинки'>Новинки</Tabs.Tab>
      </Tabs.List>
    </Tabs>
    </section>
  </header>  
  )
}

