import {
  appendElAfterElByName,
  assignErrorOutlineByName,
  findOutliersAndActOnArr,
  removeErrorOutlineByName,
} from '../utils'

type FormErrorProps = {
  message: string
}

/**
 * Sets the errors to the form
 * @param {string[]} invalidInputs - The names of the inputs that are invalid
 *  @param {string[]} prevInvalidInputs - The names of the inputs that were previously invalid
 */
export const setErrorsToForm = (invalidInputs: string[], prevInvalidInputs: string[]) => {
  // If the invalid inputs have changed, assign the error outline to the new invalid inputs
  findOutliersAndActOnArr(invalidInputs, prevInvalidInputs, doAddActions)

  // Append the error message to the form after the given inputs

  // If the invalid inputs have changed, remove the error outline from the old invalid inputs
  findOutliersAndActOnArr(prevInvalidInputs, invalidInputs, doRemoveActions)
}

const doAddActions = (name: string) => {
  assignErrorOutlineByName(name)
}

const doRemoveActions = (name: string) => {
  removeErrorOutlineByName(name)
}

const FormError = ({ message }: FormErrorProps) => {
  return <div>{message.length > 0 && <span className='text-style-tertiary text-red-500 text-sm'>{message}</span>}</div>
}

export default FormError
