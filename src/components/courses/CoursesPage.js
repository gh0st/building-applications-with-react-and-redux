import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';

class CoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("Loading courses failed " + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed " + error);
      });
    }
  }

  render() {
    return (
      <>
      <h2>Courses</h2>
      <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  // since we declared mapDispatchToProps, dispatch is no longer injected.
  // only the actions we declared in mapDispatchToProps are passed in.
  actions: PropTypes.object.isRequired
};

//this func determines what state is passed to our component via props
function mapStateToProps(state) {
  return {
    courses: state.authors.length === 0
      ?  []
      : state.courses.map(course => {
        return {
          ...course,
          authorName: state.authors.find(a => a.id === course.authorId).name
        }
      }), // be specific, request only the data your component needs
    authors: state.authors
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // remember, if you don't call dispatch, nothing will happen. action
    // creators must be called by dispatch
    // dispatch is the function that notifies redux about an action
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  }
}

// when we omit mapDispatchToProps, our componenet gets a dispatch prop injected automatically
// mapDispatchToProps determines what actions are available on props in our component
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
