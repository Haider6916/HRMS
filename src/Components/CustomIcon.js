import React from 'react'
import { SvgIcon } from '@mui/material'

const CustomIcon = ({imgPath}) => {
  return (
    <div>
        <SvgIcon viewBox="0 0 30 30">
            <path d={imgPath}/>

        </SvgIcon>
    </div>
  )
}

export default CustomIcon


