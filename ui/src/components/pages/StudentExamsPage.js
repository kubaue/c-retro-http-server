import React from "react";
import PageWithRouting from '../PageWithRouting';
import { connect } from 'react-redux';
import { fetchExams, fetchGroups } from '../../actions/actions';
import styles from './StudentExams.module.css';
import { userData } from '../../selectors/authSelectors';
import browserHistory from '../../history';

class StudentExamsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchExams();
    this.props.fetchGroups();
  }

  render() {
    if (this.props.exams.length && this.props.groups.length) {
      return (
        <PageWithRouting title={'Your Exams'}>
          <div className={styles.container}>
            {this.myExams().map(exam => this.renderExam(exam))}
            {!this.myExams().length && (<h4>You don't have any exams</h4>)}
          </div>
        </PageWithRouting>
      );
    }
    return null;
  }

  myExams() {
    const myGroup = this.myGroup();

    if (!myGroup) {
      return [];
    }

    const myGroupId = myGroup.id;
    return this.props.exams.filter(exam => exam.groupId === myGroupId);
  }

  myGroup() {
    const myId = this.props.myId;
    return this.props.groups.find(group => group.students.includes(myId));
  }

  groupName(exam) {
    const group = this.props.groups.find(group => group.id === exam.groupId);
    return group ? group.groupName : '';
  }

  renderExam(exam) {
    return (
      <div className={styles.examEntry} onClick={() => browserHistory.push(`/studentExams/${exam.id}`)}>
        {`Exam for group ${this.groupName(exam)}. ${exam.questions.length} questions.`}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const user = userData(state);
  return {
    exams: state.exams.entries,
    groups: state.groups.entries,
    myId: user ? user.id : ''
  };
};

const mapDispatchToProps = {
  fetchExams,
  fetchGroups,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentExamsPage)