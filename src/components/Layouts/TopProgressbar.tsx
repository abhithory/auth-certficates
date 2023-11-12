"use client";
import React, { ReactNode } from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';


function TopProgressbar({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <ProgressBar
                height="4px"
                color="#4D92FF"
                options={{ showSpinner: true }}
                shallowRouting
            />
        </>
    )
}

export default TopProgressbar