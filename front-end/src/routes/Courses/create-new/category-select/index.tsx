import { FC, useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { useFetchAllCategoriesQuery } from '../../../../API/category';
import { ICategoryID } from '../../../../interface/course-data';

interface IProps {
    setCategoryID: React.Dispatch<React.SetStateAction<string>>;
    categoryID?: ICategoryID;
}


const CategorySelect: FC<IProps> = ({ setCategoryID, categoryID }) => {
    const [category, setCategory] = useState("");

    const { data: categoryArray } = useFetchAllCategoriesQuery();

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    // update old/selected category
    useEffect(() => {
        categoryID && setCategory(categoryID._id);
    }, [categoryID]);

    // manage new category
    useEffect(() => {
        category !== "" && setCategoryID(category);
    }, [category]);


    return (
        <FormControl size="small" className='w-full font-primary'>
            <InputLabel id="select-category">انتخاب دسته بندی</InputLabel>
            <Select
                required
                id="select-category"
                value={category}
                onChange={handleChange}
            >
                {(categoryArray && categoryArray.length > 0) ?

                    categoryArray.map((categoryObj, index) => (
                        <MenuItem value={categoryObj._id} key={index} className='font-primary'>
                            {categoryObj.title}
                        </MenuItem>
                    )) :

                    <MenuItem value={""} disabled className='font-primary'>دسته ای برای انتخاب وجود ندارد!</MenuItem>
                }

            </Select>
        </FormControl>
    );
};

export default CategorySelect;
