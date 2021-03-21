import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';

class CoursesPage extends React.Component {
  state = {
    course: {
      title: ""
    }
  };

  handleChange = event => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // since we didn't declare mapDispatchToProps, connect automatically adds Dispatch as a prop
    // remember: you have to dispatch an action. if you just call an action creator it won't do
    // anything. action creators just return an object
    // we don't need to call dispatch here since that's being handled in
    // mapDispatchToProps now
    this.props.createCourse(this.state.course);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input type="text" onChange={this.handleChange} value={this.state.course.title} />
        <input type="submit" value="Save" />

        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  // since we declared mapDispatchToProps, dispatch is no longer injected.
  // only the actions we declared in mapDispatchToProps are passed in.
  createCourse: PropTypes.func.isRequired
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
    createCourse: course => dispatch(courseActions.createCourse(course))
  }
}

// when we omit mapDispatchToProps, our componenet gets a dispatch prop injected automatically
// mapDispatchToProps determines what actions are available on props in our component
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
