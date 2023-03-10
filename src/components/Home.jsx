import React from 'react'
import styled from 'styled-components'
import ImgSlider from './ImgSlider'
import NewDisney from './NewDisney'
import Originals from './Originals'
import Recommends from './Recommends'
import Trending from './Trending'
import Viewers from './Viewers';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {db} from "../firebase";
import { setMovies } from '../features/movie/movieSlice'
import { selectUserName } from '../features/user/userSlice'
import { doc, getDocs, collection } from "firebase/firestore";

function Home(props) {

  const dispatch = useDispatch();
  const userName = useSelector(selectUserName)
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trending = [];


  useEffect(() => {
    async function getMovies() {
      const querySnapshot = await getDocs(collection(db, "movies"));
      querySnapshot.forEach((doc) => {
        switch(doc.data().type){
                case 'recommend':
                 recommends.push({id:doc.id,...doc.data()})
                  break;
      
                case 'new':
                  newDisneys.push({id:doc.id,...doc.data()})
                  break;
      
                case 'original':
                  originals.push({id:doc.id,...doc.data()})
                  break;
      
                case 'trending':
                  trending.push({id:doc.id,...doc.data()})
                  break;
        }
      });
      dispatch(setMovies({
        recommend : recommends,
        newDisney: newDisneys,
        original: originals,
        trending: trending
    }))
    }
    getMovies()
    
  }, [userName])

  return (
      <Container>
        <ImgSlider />
        <Viewers />
        <Recommends />
        <NewDisney />
        <Originals />
        <Trending />
      </Container>
      )
}


const Container = styled.main`
    position: relative;
    min-height: calc(100vh-250px);
    overflow-x: hidden;
    display: block;
    top: 72px;
    padding: calc(3.5vw + 5px);

    &:after{
        background: url("/images/home-background.png") center center / cover
        no-repeat fixed;
        content: "";
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
    }
`

export default Home