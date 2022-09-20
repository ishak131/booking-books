import React from 'react'
import { ActivityIndicator } from 'react-native'
import style from '../styles'
export default function Loader({ isLoading }) {
    return (
        isLoading && <ActivityIndicator style={{
            height: "100%",
            width: "100%",
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: 'absolute',
            backgroundColor: 'rgba(52, 52, 52, 0.8)'
        }} size="large" color={style.primaryColor} />
    )
}
