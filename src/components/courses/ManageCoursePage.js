import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from "../common/Spinner";
import { toast } from 'react-toastify';

function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [ course, setCourse ] = useState({ ...props.course });
  const [ errors, setErrors ] = useState({});
  const [ saving, setSaving ] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert('Loading courses failed ' + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert('Loading authors failed ' + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value //this is javascripts computed property syntax, it allows us to reference a property via a variable
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success('Course saved.');
        history.push('/courses');
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  // since we declared mapDispatchToProps, dispatch is no longer injected.
  // only the actions we declared in mapDispatchToProps are passed in.
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

//this func determines what state is passed to our component via props
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course, // look at the url and determine if they're updating or creating a course
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
};

// when we omit mapDispatchToProps, our componenet gets a dispatch prop injected automatically
// mapDispatchToProps determines what actions are available on props in our component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
