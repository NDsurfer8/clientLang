import AuthContent from '../components/Auth/AuthContent';
import React, { useContext, useState } from 'react'
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { authenticate } from '../util/auth';
import { Alert } from 'react-native'
import { AuthContext } from '../../store/auth-context';
import { View, Image, StyleSheet } from 'react-native'

function LoginScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext)

    async function loginHandler({ email, password }) {
        setIsAuthenticating(true)
        try {

            const token = await authenticate(email, password);
            authCtx.authenticate(token);
        } catch (error) {
            Alert.alert('Authentication failed', 'Could not login,  please check your credentials.')
            setIsAuthenticating(false)
        }

    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging you in ..." />
    }


    return (
        <>
            <AuthContent isLogin onAuthenticate={loginHandler} />
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/images/Langiddy_logo.png')} />
            </View>
        </>
    )
}

export default LoginScreen;
const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 375,
        alignItems: 'center'
    },
    imageContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    }
})