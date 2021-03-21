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
    this.props.dispatch(courseActions.createCourse(this.state.course));
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
  dispatch: PropTypes.func.isRequired
};

//this func determines what state is passed to our component via props
function mapStateToProps(state) {
  return {
    courses: state.courses // be specific, request only the data your component needs
  }
}

// when we omit mapDispatchToProps, our componenet gets a dispatch prop injected automatically
export default connect(mapStateToProps)(CoursesPage);
