import { SudoRandColor } from './models/Color.model'

/**
 * Formats and returns a string param list to append to the url.
 * @param urlParams obj arr: Arr of objs containing a key value pair
 * @return string param list
 */
export const formatUrlGetParams = (urlParams: { key: string; value: string }[]) => {
  let currentUrlParams = new URLSearchParams()
  urlParams.map((kvPair) => {
    if (kvPair.value.length > 0 && kvPair.value !== '0') currentUrlParams.set(kvPair.key, kvPair.value)
    else currentUrlParams.delete(kvPair.key)
  })
  return currentUrlParams.toString().length ? '?' + currentUrlParams.toString().replace(/\+/g, ' ') : ''
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 *
 * @param color String: Keyword to determine color classes to return
 * @returns tailwind color classes matching the passed color
 */
export const getElColorClasses = (color: string) => {
  switch (color) {
    case 'red':
      return {
        bg: 'bg-red-500',
        text: 'text-red-500',
      }
    case 'green':
      return {
        bg: 'bg-green-500',
        text: 'text-green-500',
      }
    default:
      return {
        bg: 'bg-slate-100',
        text: 'text-white',
      }
  }
}

/**
 * Returns a color from the SudoRandColor enum. The color is determined by the passed index and loops back to the beginning of the enum if the index is out of bounds.
 * @returns string: random color
 * @see SudoRandColor
 */
export const getSudoRandColor = (index: number) => {
  return SudoRandColor[index % (Object.keys(SudoRandColor).length / 2)]
}

/**
 * Gets an element by its name attribute
 * @param name string: name attribute of the element
 * @returns HTMLElement
 *
 */
export const getElByName = (name: string) => {
  return document.getElementsByName(name)[0]
}

/**
 * Assigns an error outline to an element by its name attribute
 * @param name string: name attribute of the element
 */
export const assignErrorOutlineByName = (name: string) => {
  const el = getElByName(name)
  if (el) {
    el.classList.add('outline', 'outline-red-500', 'outline-4')
  }
}

/**
 * Removes an error outline from an element by its name attribute
 * @param name string: name attribute of the element
 *
 */
export const removeErrorOutlineByName = (name: string) => {
  const el = getElByName(name)
  if (el) {
    el.classList.remove('outline', 'outline-red-500', 'outline-4')
  }
}

/**
 * Appends an element after an existing element based on name
 * @param name string: name attribute of the element to append after
 * @param el HTMLElement: element to append
 */
export const appendElAfterElByName = (name: string, el: HTMLElement) => {
  const existingEl = getElByName(name)
  if (existingEl) {
    existingEl.after(el)
  }
}

/**
 * Removes an element by its name attribute
 * @param name string: name attribute of the element
 * @returns HTMLElement
 *
 */
export const removeElByName = (name: string) => {
  const el = getElByName(name)
  if (el) {
    el.remove()
  }
}

/**
 * Compares two string arrays and performs an action on the elements that exist in the valuesToFind but not the arrToCheck
 * @param valuesToFind string[]: First array to compare
 * @param arrToCheck string[]: Second array to compare
 * @param action Function: Action to perform on the elements that are different
 */
export const findOutliersAndActOnArr = (
  valuesToFind: string[],
  arrToCheck: string[],
  action: (param1: string) => void
) => {
  // If the values have changed, perform the action on the new value
  valuesToFind.forEach((value) => {
    if (!arrToCheck.includes(value)) action(value)
  })
}

/**
 * Checks if two string arrays are equal
 *
 * @param arr1 string[]: First array to compare
 * @param arr2 string[]: Second array to compare
 * @returns boolean: True if the arrays are equal, false if they are not
 */
export const arraysAreEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) {
    return false
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}

/**
 * Calculates position along an angle based on number of elements and index of the element
 * @param angle number: Angle to calculate position along
 * @param totalPositions number: Total number of positions to calculate
 * @param positionIndex number: Index of the position to calculate
 * @returns number: Position along the angle
 *
 */
export const calculatePositionAlongAngle = (angle: number, totalPositions: number, positionIndex: number) => {
  const step = angle / (totalPositions - 1)
  return step * positionIndex
}

/**
 *  Gets the inverse index of an array
 * @param length number: Length of the array
 * @param index number: Index of the element to get the inverse of
 * @returns number: Inverse index of the element
 */
export const inverseIndex = (length: number, index: number) => {
  return length - 1 - index
}

/**
 * Truncates a list to a specified length
 * @param list unknown[]: List of strings to truncate
 * @param length number: The number of elements to truncate the list to
 * @returns string: Truncated list of strings
 */
export const truncateList = (list: unknown[], length: number) => {
  return list.slice(0, length)
}

/**
 * Takes a list of strings and returns a string of the list separated by commas and truncated to a specified length
 * @param list unknown[]: List of strings to truncate
 * @param length number: The number of elements to truncate the list to
 * @returns string: Truncated list of strings
 */
export const truncateListToString = (list: unknown[], length: number) => {
  // If the list is empty, return an empty string
  if (list.length === 0) return ''

  // If the length of the list is the same or less than the length to truncate to, return the list as a string
  if (list.length <= length) return list.join(', ')

  // If the length of the list is greater than the length to truncate to, return the truncated list as a string
  const truncatedList = truncateList(list, length)
  return truncatedList.join(', ') + ', ...'
}
