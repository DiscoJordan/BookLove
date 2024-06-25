import { log } from 'mathjs'
import React from 'react'

function Profile({user}) {
    console.log(user);
  return (
    <div className='profile__wrapper'>
        <div className="container">
            <div className="profile__info">
                <div className="profile__avatar">
                    <img src="/images/defaultavatar.png" alt="default avatar" />
                </div>
                <div className="profile__username">
                    <h3>{user.username}</h3>
                    <div className="profile__badge">
                        <h3>0</h3>
                    </div>
                </div>
                    <div className="profile__about">
                        <p>Some infofmation about user</p>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Profile