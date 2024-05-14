import { Button } from '@headlessui/react'
import React from 'react'

function StickyFooter() {
  return (
    <div className='bg-red-700 h-100 sticky top-0 bottom-0'>
        <Button className="bg-blue-950">Order</Button>
    </div>
  )
}

export default StickyFooter