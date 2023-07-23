import React, { useEffect, useState } from 'react'

type SortByPropProps = {
  sortableObjArr: any[]
  setSortableObjArr: React.Dispatch<React.SetStateAction<any[]>>
  sortBy: {
    friendly: string
    name: string
  }
  sortByType: 'string' | 'number' | 'date'
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const SortByProp = ({ sortableObjArr, setSortableObjArr, sortBy, sortByType, setLoading }: SortByPropProps) => {
  const [dir, setDir] = useState<boolean>(false) // true = ASC, false= DESC
  const [showDirLabel, setShowDirLabel] = useState<boolean>(true)

  const remapDataArr = (arrToCopy: any[]) => {
    const newDataInit = [] as any
    arrToCopy.map((arrObj: any, i: number) => {
      newDataInit[i] = {}
      Object.keys(arrObj).map((objProp: string) => {
        newDataInit[i][objProp] = arrObj[objProp]
      })
    })
    return newDataInit
  }

  const [unsortedObjArr, setUnsortedObjArr] = useState<any>(remapDataArr(sortableObjArr)) // Unaltered version of the original list.
  const [newData, setNewData] = useState<any>(remapDataArr(sortableObjArr)) // Mutatable version of the sortableObjArr that will have work performed on it.

  const doSortObjArr = (dir: boolean) =>
    new Promise<any[]>((resolve, reject) => {
      try {
        newData.sort((a: any, b: any) => {
          if (a[sortBy.name] === null && b[sortBy.name] === null) {
            return 0 // if a and b are both null, do nothing.
          } else if (a[sortBy.name] === null) {
            return dir ? 1 : -1 // if a is undefined, automatically sort it as the lowest item on list
          } else if (b[sortBy.name] === null) {
            return dir ? -1 : 1 // if b is undefined, automatically sort it as lowest item on list
          } else if (a[sortBy.name] < b[sortBy.name]) {
            return dir ? -1 : 1
          } else if (a[sortBy.name] > b[sortBy.name]) {
            return dir ? 1 : -1
          } else {
            return 0
          }
        })
        resolve(newData)
      } catch (error) {
        reject(error)
      }
    })

  const sortObjArr = (dir: boolean) => {
    setLoading(true)
    doSortObjArr(dir)
      .then((sortedObjArr: any[]) => {
        setSortableObjArr(sortedObjArr)
        setDir(dir)
        setShowDirLabel(true)
        setNewData(remapDataArr(unsortedObjArr)) // resets newData to the unaltered list
        setTimeout(() => {
          setLoading(false)
        }, 100)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  useEffect(() => {
    // setShowDirLabel(false)
  }, [sortableObjArr])

  return (
    <div
      className='cursor-pointer inline-block'
      onClick={() => {
        sortObjArr(!dir)
      }}>
      <div className='inline align-middle pr-1'>{sortBy.friendly}</div>
      {!showDirLabel && <div className='align-middle inline-block w-5 h-5'></div>}
      {showDirLabel && (
        <span className='align-middle text-xs'>
          <svg
            className={'md:hidden -ml-1.5 h-5 w-5 inline-block align-top transform' + (dir ? ' rotate-180' : '')}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'>
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
          <span className='hidden md:inline'>
            ({sortByType === 'string' && <>{dir ? 'A-Z' : 'Z-A'}</>}
            {sortByType === 'number' && <>{dir ? 'ASC' : 'DESC'}</>}
            {sortByType === 'date' && <>{dir ? 'OLDEST' : 'NEWEST'}</>})
          </span>
        </span>
      )}
    </div>
  )
}
