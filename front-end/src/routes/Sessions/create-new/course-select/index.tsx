import { FC, useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { useFetchAllCoursesQuery } from '../../../../API/courses';

interface IProps {
    setCourseID: React.Dispatch<React.SetStateAction<string>>;
    courseID?: string;
}


const CourseSelect: FC<IProps> = ({ setCourseID, courseID }) => {
    const [course, setCourse] = useState("");

    const { data: coursesArray } = useFetchAllCoursesQuery();

    const handleChange = (event: SelectChangeEvent) => {
        setCourse(event.target.value as string);
    };

    // update old/selected course
    useEffect(() => {
        courseID && setCourse(courseID);
    }, [courseID]);

    // manage new course
    useEffect(() => {
        course !== "" && setCourseID(course);
    }, [course]);


    return (
        <FormControl size="small" className='w-full font-primary'>
            <InputLabel id="select-course">انتخاب دوره</InputLabel>
            <Select
                required
                id="select-course"
                value={course}
                onChange={handleChange}
            >
                {(coursesArray && coursesArray.length > 0) ?

                    coursesArray.map((courseObj, index) => (
                        <MenuItem value={courseObj._id} key={index} className='font-primary'>
                            {courseObj.name}
                        </MenuItem>
                    )) :

                    <MenuItem value={""} disabled className='font-primary'>دوره ای برای انتخاب وجود ندارد!</MenuItem>
                }

            </Select>
        </FormControl>
    );
};

export default CourseSelect;
