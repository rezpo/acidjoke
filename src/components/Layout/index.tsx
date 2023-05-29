import React from 'react'
import Header from "../Header"
import Footer from '../Footer'
import {LayoutProps} from "./Layout.types"

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <>
        <Header/>
            <div>{children}</div>
        <Footer/>
    </>
  )
}

export default Layout
