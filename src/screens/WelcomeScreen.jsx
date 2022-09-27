import { StyleSheet, Text, View, Button } from 'react-native';

function WelcomeScreen({navigation, id}) {
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>Welcome to Langiddy!</Text>
            <Text>Please select a language!</Text>
            <Button
                title= 'Next'
                onPress={()=>navigation.navigate('ProfileNav',{user: id})}
            />
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});