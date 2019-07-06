import React from "react";
import PageWithRouting from '../PageWithRouting';
import { connect } from 'react-redux';
import styles from './ExamsPage.module.css';
import browserHistory from '../../history';
import { userData } from '../../selectors/authSelectors';
import { fetchCompletedExams, fetchExams, fetchStudents } from '../../actions/actions';
import _ from 'lodash';

class ExamsPage extends React.Component {

  componentDidMount() {
    this.props.fetchExams();
    this.props.fetchCompletedExams();
    this.props.fetchStudents();
  }

  render() {
    if (this.props.role === 'examiner') {
      return (
        <PageWithRouting title={'Your exams'}>
          <div className={styles.container}>
            <div className={`${styles.exam} ${styles.header}`}>
              <div className={styles.examId}>Exam ID</div>
              <div className={styles.groupName}>Group ID</div>
              <div className={styles.questions}>Questions</div>
            </div>
            {this.props.exams.map(exam => this.renderExam(exam))}
            <div className={styles.createExamContainer}>
              <button onClick={() => this.createExam()}>Create exam</button>
            </div>
          </div>
        </PageWithRouting>
      );
    }
    return null;
  }

  renderExam(exam) {
    return <div className={styles.entry}>
      <div
        onClick={() => this.navigateToExam(exam)}
        className={styles.exam}
        key={exam.id}
      >
        <div className={styles.examId}>{exam.id}</div>
        <div className={styles.groupName}>{exam.groupId}</div>
        <div className={styles.questions}>{exam.questions.length}</div>
      </div>
      <div className={styles.results}>
        {_.flatMap(this.props.completedExams.filter(c => c.examId === exam.id), completedExam => ({ studentId: completedExam.studentId, score: completedExam.score })).map(result => this.renderResult(result))}
      </div>
    </div>
  }

  navigateToExam(exam) {
    browserHistory.push(`/exams/${exam.id}`)
  }

  createExam() {
    browserHistory.push('/createExam');
  }

  renderResult(result) {
    return (
      <div className={styles.result}>
        <div className={styles.studentName}>{this.studentName(result.studentId)}</div>
        <div className={styles.score}>{result.score} points</div>
      </div>
    )
  }

  studentName(studentId) {
    const student = this.props.students.find(s => s.id === studentId);
    return student ? student.name : ''
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students.entries,
    exams: state.exams.entries,
    completedExams: state.completedExams.entries,
    role: userData(state).role
  };
};

const mapDispatchToProps = {
  fetchExams,
  fetchCompletedExams,
  fetchStudents
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamsPage)