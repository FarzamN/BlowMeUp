import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import InstagramLogin from 'react-native-instagram-login';

const Instagram = () => {
    const [token, setToken] = useState('');
    const instagramLogin = useRef(null);

    const setIgToken = (data) => {
        console.log('data', data);
        setToken(data.access_token);
    }

    const onClear = () => {
        setToken(null);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
            <TouchableOpacity
                style={{
                    borderRadius: 5,
                    backgroundColor: '#E1306C',
                    height: 30,
                    width: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => instagramLogin.current.show()}>
                <Text style={{ color: 'white' }}>Login</Text>
            </TouchableOpacity>
            <Text style={{ margin: 10 }}>Token: {token}</Text>
            <TouchableOpacity onPress={onClear}>
                <Text>Clear Token</Text>
            </TouchableOpacity>
            <InstagramLogin
                ref={instagramLogin}
                appId='<YOUR INSTAGRAM APP ID>'
                appSecret='<YOUR INSTAGRAM APP SECRET>'
                redirectUrl='<YOUR REDIRECT URL>'
                scopes={['user_profile', 'user_media']}
                onLoginSuccess={setIgToken}
                onLoginFailure={(data) => console.log(data)}
            />
        </View>
    );
};

export default Instagram;
