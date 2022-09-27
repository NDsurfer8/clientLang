import React,{useEffect} from 'react'
import ProfileInfo from '../components/Profile/ProfileInfo';
import Statistics from '../components/Profile/Statistics';
import axios from 'axios';

const ProfileScreen = (props) => {
    const {navigation} = props
    
    
    return (
        <>
            <ProfileInfo navigation={navigation}/>
            <Statistics />
        </>
    )
}

export default ProfileScreen