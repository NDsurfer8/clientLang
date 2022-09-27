import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../store/auth-context';


const ProfileInfo = (props) => {
    const { navigation, route } = props

    const authCtx = useContext(AuthContext);
    const token = authCtx.token


    const [userInfo, setUserInfo] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:3000/api/users/`)
            .then(res => setUserInfo(res.data.user))
            .catch(err => console.log(err))
    }, [])


    return (
        <View style={styles.backgroundColor}>
            <View style={styles.imageContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.fullNameText}>Noah Duran</Text>
                    <Text style={styles.nickNameText}>DmanDuran</Text>
                    <Text style={styles.infoText}><Ionicons name="time-outline" size={20} color="black" />Member since dec</Text>
                    <Text style={styles.infoText}><FontAwesome5 name="user-friends" size={17} color="black" />  88 friends</Text>
                    <Text style={styles.infoText}><Ionicons name="location" size={20} color="black" />  California</Text>
                </View>
                <View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
                            <FontAwesome5 name="edit" size={20} color="black" style={styles.edit} />
                        </TouchableOpacity>
                        <Image style={styles.image} source={require('../../../assets/images/smartImage.png')} />
                    </View>

                    <View style={styles.socialContainer}>
                        <Foundation name="social-facebook" size={24} color="black" onPress={''} />
                        <FontAwesome5 name="instagram-square" size={21} color="black" onPress={''} />
                        <FontAwesome name="linkedin-square" size={21} color="black" onPress={''} />
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.statisticsText}>Statistics</Text>
            </View>
            <View style={styles.statisticsBorder}>
            </View>
        </View>
    )
}

export default ProfileInfo
const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    image: {
        margin: 10,
        maxWidth: '80%',
        maxheight: '80%',
        width: 150,
        height: 140,
        borderRadius: 100,
        borderColor: 'lightblue',
        borderWidth: 4
    },
    fullNameContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    fullNameText: {
        fontSize: 20,
        fontWeight: '400',
        Color: 'gray'
    },
    nickNameText: {
        color: 'gray'
    },
    infoContainer: {
        marginTop: 5,
        padding: 10,
        marginLeft: 2
    },
    infoText: {
        margin: 2,
        color: 'gray'
    },
    socialContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    statisticsText: {
        margin: 20,
        fontSize: 20,
        fontWeight: '400',
        Color: 'gray'
    },
    edit: {
        marginTop: 5,
        marginLeft: 125,
        position: 'absolute'
    }

})