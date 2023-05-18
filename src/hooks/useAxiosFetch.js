import axios from "axios"
import { useEffect, useState } from "react"

const useAxiosFetch = (dataurl) => {

    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null)
    const [isLoadinng, setIsLoadinng] = useState(false)

    useEffect(() => {
        
        let isMounted = true
        const source = axios.CancelToken.source()
        const fetchData = async (url) => {
            setIsLoadinng(false)
            try {
                
                const response = await axios.get(url, {
                    cancelToken: source.token})
                if (isMounted) {
                    setData(response.data)
                    setFetchError(null)
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message)
                    setData([])
                }
            } finally {
                isMounted && setTimeout(() => {
                    setIsLoadinng(false)
                }, 2000); 
            }
        }
        fetchData(dataurl)
        const cleanUp = () => {
            isMounted = false
            source.cancel()
        }
        return cleanUp()
    }, [dataurl])
    return { data, fetchError, isLoadinng }
}

export default useAxiosFetch