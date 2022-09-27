import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Alert } from 'react-native'
import { AuthContext } from '../../store/auth-context'
import { View, Image, StyleSheet } from 'react-native'

function SignupScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

    async function signupHandler({ email, password }) {
        setIsAuthenticating(true)
        try {
            const token = await createUser(email, password);
            authCtx.authenticate(token)
        } catch (error) {
            Alert.alert('Authentication failed')
            setIsAuthenticating(false)
        }

    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating user ..." />
    }

    return (
        <>
            <AuthContent onAuthenticate={signupHandler} />
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/images/Langiddy_logo.png')} />
            </View>
        </>
    )
}

export default SignupScreen;
const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 375,
        alignItems: 'center'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    form: {
        marginTop: 50
    }
})