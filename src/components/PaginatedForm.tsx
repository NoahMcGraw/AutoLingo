import React, { useState, ReactNode, FormEvent } from 'react'

interface PaginatedFormProps {
  children: ReactNode[]
  submitFunction: () => void
}

const PaginatedForm = ({ children, submitFunction }: PaginatedFormProps) => {
  const [currentPage, setCurrentPage] = useState(0)

  const handleSubmit = (event: FormEvent) => {
    // TODO: Add validation

    event.preventDefault()
    submitFunction()
  }

  const handleNext = () => {
    if (currentPage < children.length - 1) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {children[currentPage]}

      <button type='button' onClick={handlePrev} disabled={currentPage === 0}>
        Previous
      </button>
      <button type='button' onClick={handleNext} disabled={currentPage === children.length - 1}>
        Next
      </button>

      {currentPage === children.length - 1 && <button type='submit'>Submit</button>}
    </form>
  )
}

export default PaginatedForm
