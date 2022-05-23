/**
 * Formats and returns a string param list to append to the url.
 * @param urlParams obj arr: Arr of objs containing a key value pair
 * @return string param list
 */
export const formatUrlGetParams = (urlParams: {key: string, value: string}[]) => {
    let currentUrlParams = new URLSearchParams();
    urlParams.map(kvPair => {
        if (kvPair.value.length > 0 && kvPair.value !== '0') currentUrlParams.set( kvPair.key, kvPair.value );
        else currentUrlParams.delete(kvPair.key)
    })
    return currentUrlParams.toString().length ? '?' + currentUrlParams.toString().replace(/\+/g,' ') : '';
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *
 * @param color String: Keyword to determine color classes to return
 * @returns tailwind color classes matching the passed color
 */
export const getElColorClasses = (color: string) => {
  switch (color) {
    case "red":
      return {
        bg: "bg-red-500",
        text: "text-red-500"
      }
    case "green":
      return {
        bg: "bg-green-500",
        text: "text-green-500"
      }
    default:
      return {
        bg: "bg-slate-100",
        text: "text-white"
      }
  }
}
