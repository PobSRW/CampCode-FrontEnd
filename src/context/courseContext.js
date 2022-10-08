import { createContext, useContext, useEffect, useState } from 'react';
import * as courseApi from '../api/courseApi';

const CourseContext = createContext();

function CourseContextProvider({ children }) {
	const [courses, setCourses] = useState(null);
	const [newCourses, setNewCourses] = useState(null);
	const [courseById, setCourseById] = useState(null);

	const fetchCourseItem = async () => {
		try {
			const res = await courseApi.getCourse();
			setCourses(res.data.item);
		} catch (err) {
			console.log('Fetch Course Error');
		}
	};

	const fetchNewCourseItem = async () => {
		try {
			const res = await courseApi.getNewCourse();
			setNewCourses(res.data.item);
		} catch (err) {
			console.log('Fetch New Course Error');
		}
	};

	const fetchCourseItemById = async (id) => {
		try {
			const res = await courseApi.getCourseById(id);
			setCourseById(res.data.itemById);
			// console.log(res.data.itemById);
		} catch (err) {
			console.log('Fetch Course By Id Error');
		}
	};

	const onDeleteCoure = async (id) => {
		try {
			await courseApi.deleteCourse(id);
			fetchCourseItem();
			fetchNewCourseItem();
		} catch (err) {
			console.log('Delete Error!');
		}
	};

	const onUpdateCourse = async (id, input) => {
		try {
			await courseApi.updateCourse(id, input);
		} catch (err) {
			console.log('Update Error!');
		}
	};

	const createCourse = async (input) => {
		try {
			await courseApi.createCourse(input);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchCourseItem();
		fetchNewCourseItem();
	}, []);

	return (
		<CourseContext.Provider
			value={{
				courses,
				createCourse,
				onDeleteCoure,
				onUpdateCourse,
				newCourses,
				fetchNewCourseItem,
				courseById,
				fetchCourseItemById,
				fetchCourseItem,
			}}
		>
			{children}
		</CourseContext.Provider>
	);
}

export const useCourseContext = () => {
	return useContext(CourseContext);
};

export default CourseContextProvider;
