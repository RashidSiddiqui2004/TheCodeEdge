
import React from 'react'
import EditorialHeader from './EditorialHeader'
import EditorialBody from './EditorialBody'
import Navigation from './Navigation'
import CommentSection from './CommentSection'

const Editorial = () => {
    return (
        <div>
            <EditorialHeader />
            <EditorialBody />
            <Navigation />
            <CommentSection />
        </div>
    )
}

export default Editorial