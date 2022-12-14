import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Contacts from 'expo-contacts';

const ContactsScreen = () => {
    const [error, setError] = useState();
    const [contacts, setContacts] = useState();

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails,
                    Contacts.Fields.PhoneNumbers,
                    Contacts.Fields.Addresses,
                    Contacts.Fields.FirstName,
                    Contacts.Fields.LastName,
                    Contacts.Fields.Birthday,
                    ],
                });

                if (data.length > 0) {
                    // const contact = data[0];
                    setContacts(data)
                } else {
                    setError('No contacts found');
                }
            }
        })();
    }, []);




    let getContactRows = () => {
        if (contacts !== undefined) {
            return <FlatList
                data={contacts}
                keyExtractor={(item) => {
                    return item.id;
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity>
                            <View style={styles.row}>
                                <Image source={{ uri: item.image }} style={styles.pic} />
                                <View>
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                                        <Text style={styles.mblTxt}>Mobile</Text>
                                    </View>
                                    <View style={styles.msgContainer}>
                                        <Text style={styles.msgTxt}>{item.status}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        } else {
            return <Text>Awaiting contacts...</Text>
        }
    }
    return (
        <View>
            <Text>{error}</Text>
            {getContactRows()}
        </View>
    )
}

export default ContactsScreen

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
    },
    pic: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 18,
        width: 170,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 12,
        marginLeft: 15,
    },
})