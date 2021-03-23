import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';

function ManageCoursePage({ courses, authors, loadAuthors, loadCourses, ...props }) {
  const [ course, setCourse ] = useState({ ...props.course });
  const [ errors, setErrors ] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert('Loading courses failed ' + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert('Loading authors failed ' + error);
      });
    }
  }, []);

  return (
    <CourseForm course={course} errors={errors} authors={authors} />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  // since we declared mapDispatchToProps, dispatch is no longer injected.
  // only the actions we declared in mapDispatchToProps are passed in.
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

//this func determines what state is passed to our component via props
function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors
};

// when we omit mapDispatchToProps, our componenet gets a dispatch prop injected automatically
// mapDispatchToProps determines what actions are available on props in our component
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
