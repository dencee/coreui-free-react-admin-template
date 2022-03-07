import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://mindwellnessforall.com" target="_blank" rel="noopener noreferrer">
          mindwellnessforall
        </a>
        <span className="ms-1">&copy; 2022 Arjuna Marketing.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
