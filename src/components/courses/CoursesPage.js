import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch(error => {
      alert("Loading courses failed " + error);
    });
  }

  render() {
    return (
      <>
      <h2>Courses</h2>
      {this.props.courses.map(course => (
        <div key={course.title}>{course.title}</div>
      ))}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  // since we declared mapDispatchToProps, dispatch is no longer injected.
  // only the actions we declared in mapDispatchToProps are passed in.
  actions: PropTypes.object.isRequired
};

//this func determines what state is passed to our component via props
function mapStateToProps(state) {
  return {
    courses: state.courses // be specific, request only the data your component needs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // remember, if you don't call dispatch, nothing will happen. action
    // creators must be called by dispatch
    // dispatch is the function that notifies redux about an action
    actions: bindActionCreators(courseActions, dispatch)
  }
}

// when we omit mapDispatchToProps, our componenet gets a dispatch prop injected automatically
// mapDispatchToProps determines what actions are available on props in our component
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
