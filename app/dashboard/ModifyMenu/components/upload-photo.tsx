import { useRef, useState, createRef, ChangeEvent } from 'react'

function useImage() {
    const inputRefs = useRef<{
        [areaId: number]: {
            [itemId: number]: React.RefObject<HTMLInputElement>
        }
    }>({})
    const [images, setImages] = useState<{
        [areaId: number]: { [itemId: number]: { name: string; url: string } }
    }>({})

    const handleUpload = (
        areaId: number,
        itemId: number,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageURL = URL.createObjectURL(file)

            setImages((prevImages) => ({
                ...prevImages,
                [areaId]: {
                    ...prevImages[areaId],
                    [itemId]: { name: file.name, url: imageURL },
                },
            }))
        }
    }

    const handleRemove = (areaId: number, itemId: number) => {
        URL.revokeObjectURL(images[areaId][itemId].url)
        setImages((prevImages) => {
            const updatedImages = { ...prevImages }
            delete updatedImages[areaId][itemId]
            return updatedImages
        })
        if (inputRefs.current[areaId] && inputRefs.current[areaId][itemId]) {
            inputRefs.current[areaId][itemId].current!.value = ''
        }
    }

    const getInputRef = (areaId: number, itemId: number) => {
        if (!inputRefs.current[areaId]) {
            inputRefs.current[areaId] = {}
        }
        if (!inputRefs.current[areaId][itemId]) {
            inputRefs.current[areaId][itemId] = createRef<HTMLInputElement>()
        }
        return inputRefs.current[areaId][itemId].current! // 取得真實的 DOM 元素
    }

    const getImage = (areaId: number, itemId: number) => {
        return images[areaId] && images[areaId][itemId]
            ? images[areaId][itemId]
            : null
    }

    return {
        handleUpload,
        handleRemove,
        getInputRef,
        getImage,
    }
}

export default useImage
