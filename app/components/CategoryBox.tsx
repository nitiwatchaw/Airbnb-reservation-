import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string'


interface CategoryBoxProps {
    label: string;
    icon: IconType;
    selected?: boolean 
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ label, icon: Icon, selected }) => {

    const router = useRouter()
    const params = useSearchParams()


    const handleClick = useCallback(() => {

        let currentQuery = {}

        // look for current params
        if (params) {
            // parse to object
            currentQuery = qs.parse(params.toString())
        }

        // add new category
        const updateQuery: any = {
            ...currentQuery, category: label
        }

        // category is selected if click it again then will remove updateQuery
        if (params?.get('category') === label) {
            delete updateQuery.category;
        }
        // generate url string
        const url = qs.stringifyUrl({
            url: '/',
            query: updateQuery
        }, { skipNull: true })

        // เช่น http://localhost:3000/?category=Beach
        router.push(url)

    }, [label, params, router])

    return (
        <div
            onClick={handleClick}
            className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 
        transition cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
        `}>
            <Icon size={26} />
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    )
}

export default CategoryBox