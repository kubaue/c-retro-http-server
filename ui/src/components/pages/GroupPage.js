import React from "react";
import PageWithRouting from '../PageWithRouting';
import { connect } from 'react-redux';
import { assignStudent, createGroup, fetchGroups, fetchStudents, removeStudent } from '../../actions/actions';
import styles from './GroupPage.module.css';
import _ from 'lodash';

class GroupsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedStudent: ''
    }
  }

  componentDidMount() {
    this.props.fetchGroups();
    this.props.fetchStudents();
  }

  render() {
    if (this.selectedGroup() && this.props.students.length) {
      return (
        <PageWithRouting title={this.selectedGroup().groupName}>
          <div className={styles.container}>
            <div className={`${styles.student} ${styles.header}`}>
              <div className={styles.studentId}>Student ID</div>
              <div className={styles.studentName}>Student name</div>
            </div>
            {this.studentsInGroup().map(student => this.renderStudent(student))}
            <div className={styles.assignStudentContainer}>
              <select onChange={(event) => this.setState({ selectedStudent: event.target.value })} value={this.state.selectedStudent}>
                <option value={''}/>
                {this.studentsNotInGroup().map(student => <option key={student.id} value={student.id}>{student.name}</option>)}
              </select>
              <button onClick={() => this.assignStudent()}>Assign student</button>
            </div>
          </div>
        </PageWithRouting>
      );
    }
    return null;
  }

  renderStudent(student) {
    return <div
      onClick={() => this.navigateToGroup(student)}
      className={styles.student}
      key={student.id}
    >
      <div className={styles.studentId}>{student.id}</div>
      <div className={styles.studentName}>{student.name}</div>
    </div>
  }

  selectedGroup() {
    return this.props.groups.find(group => group.id === this.props.match.params.id);
  }

  studentsInGroup() {
    return this.selectedGroup().students.map(studentId => this.props.students.find(student => student.id === studentId))
  }

  studentsNotInGroup() {
    return this.props.students.filter(student => !this.selectedGroup().students.includes(student.id));
  }

  assignStudent() {
    const selectedStudent = this.state.selectedStudent;
    if(selectedStudent) {
      this.setState({selectedStudent: ''});
      this.props.assignStudent(this.selectedGroup().id, selectedStudent);

    }
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups.entries,
    students: state.students.entries,
  };
};

const mapDispatchToProps = {
  fetchGroups,
  fetchStudents,
  createGroup,
  assignStudent,
  removeStudent
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage)