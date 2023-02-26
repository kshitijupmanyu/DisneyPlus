import {React, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'
import styled from 'styled-components'
import {db} from "../firebase";
import { doc, getDoc } from "firebase/firestore";


function Watch() {

    const {id} = useParams()
    const [detail, setDetail] = useState({})


    useEffect(() => {
        async function getDetails(){

            const docRef = doc(db, "movies", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setDetail({id:docSnap.id, ...docSnap.data()})
            } else {
            console.log("No such document!");
            }

        }
        getDetails()
    }, [id])


  return (
    <Container>
            <ReactPlayer width="100vw" height="75vh" controls={true} playing={true} url={detail.trailer} />
            <Title>{detail.title}</Title>
    </Container>
    
  )
}


const Container = styled.div`
    position: relative;
    min-height: calc(100vh-250px);
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    top: 72px;
`



const Title = styled.h2`
    color: rgb(249, 249, 249);
    font-size: 25px;
    min-height: 20px;
    margin-top: 40px;


    @media (max-width:768px){
        font-size: 16px;
    }
`

export default Watch