'use client'
import { useEffect } from 'react';
import styles from '../styles/home.module.css'

export default function Home() {
  
  useEffect(()=>{
  },[])

  return (
    <>
      <h1 className={styles.myheading}>
        HELLO WORLD
        </h1>
        <button type='general'>Click me</button>
        <button type='add'>Click me</button>
        <button type='delete'>Click me</button>
        <button type='warning'>Click me</button>
    </>

  );
}
