import React from "react";
import PageWithRouting from '../PageWithRouting';
import { connect } from 'react-redux';
import styles from './ExamsPage.module.css';
import browserHistory from '../../history';
import { userData } from '../../selectors/authSelectors';
import { fetchExams } from '../../actions/actions';

class ExamsPage extends React.Component {

  componentDidMount() {
    this.props.fetchExams();
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
    return <div
      onClick={() => this.navigateToExam(exam)}
      className={styles.exam}
      key={exam.id}
    >
      <div className={styles.examId}>{exam.id}</div>
      <div className={styles.groupName}>{exam.groupId}</div>
      <div className={styles.questions}>{exam.questions.length}</div>
    </div>
  }

  navigateToExam(exam) {
    browserHistory.push(`/exams/${exam.id}`)
  }

  createExam() {
    browserHistory.push('/createExam');
  }
}

const mapStateToProps = (state) => {
  return {
    exams: state.exams.entries,
    role: userData(state).role
  };
};

const mapDispatchToProps = {
  fetchExams
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamsPage)