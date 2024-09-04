import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './style.css'

const PhoneNoInput = ({ phone, onChangePhone }) => {

  return (
    <>
          <PhoneInput
              
              country={'pk'}
              value={phone}
              onChange={phone => {
                  onChangePhone(phone)
              }}
          />
    </>
  )
}

export default PhoneNoInput;