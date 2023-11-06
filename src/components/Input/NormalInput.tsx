"use client"
import React, { useRef, useState } from 'react'
import { FaCheck, FaCheckDouble, FaCopy } from 'react-icons/fa'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    className?: string,
}

function NormalInput({ className, ...other }: InputProps) {

    return (
        <input className={`${className ? className : "input_1"}`} {...other} />
    )
}

export default NormalInput