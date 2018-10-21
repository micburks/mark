import React from 'react'
import './Layout.css'

export default function Layout ({ Header, Banner, Sidebar, Body }) {
  return (
    <div className="Layout">
      <div className="Layout-cell--header">
        <Header/>
      </div>
      <div className="Layout-cell--banner">
        <Banner />
      </div>
      <div className="Layout-cell--sidebar">
        <Sidebar />
      </div>
      <div className="Layout-cell--body">
        <Body />
      </div>
    </div>
  )
}
