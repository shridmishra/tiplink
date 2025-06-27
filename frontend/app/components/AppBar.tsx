"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { PrimaryButton } from './Button'

export const AppBar = () => {
    const session = useSession()
    return (<div className='border-b px-2 py-2 flex justify-between items-center' > <div>Tiplink</div>
        <div>{session.data?.user ? <PrimaryButton onClick={() => { signOut() }}>LogOut</PrimaryButton> : <PrimaryButton onClick={() => { signIn() }}>SignIn</PrimaryButton>} </div>
    </div>
    )
}
