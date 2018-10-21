import React from 'react'

export default function Layout ({ Header, Banner, Sidebar, Body }) {
  return (
    <div className="Grid">
      <div className="Grid-cell--header">
        <Header/>
      </div>
      <div className="Grid-cell--banner">
        <Banner />
      </div>
      <div className="Grid-cell--sidebar">
        <Sidebar />
      </div>
      <div className="Grid-cell--body">
        <Body />
      </div>
    </div>
  )
}
