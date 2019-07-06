import React from "react";
import PageWithRouting from '../PageWithRouting';
import { connect } from 'react-redux';
import styles from './CompleteExamPage.module.css';
import { userData } from '../../selectors/authSelectors';
import { fetchExams, fetchGroups } from '../../actions/actions';

class CompleteExamPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchExams();
    this.props.fetchGroups();
  }

  render() {
    const exam = this.selectedExam();
    if(exam) {
      return (
        <PageWithRouting title={'Exam'}>
          <div className={styles.container}>
            {exam.questions.map(question => this.renderQuestion(question))}
          </div>
          <div className={styles.submitContainer}>
            <button>Submit</button>
          </div>
        </PageWithRouting>
      );
    }
    return null;
  }

  renderQuestion(question) {
    return (
      <div className={styles.question}>
        <div className={styles.questionText}>Question: {question.text}</div>
        <div className={styles.answers}>
          {question.answers.map(answer => this.renderAnswer(answer))}
        </div>
      </div>
    )
  }

  renderAnswer(answer) {
    return (
      <div className={styles.answer}>
        <input type={'radio'} className={styles.radio}/>
        <div className={styles.answerText}>answer</div>
      </div>
    );
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

  selectedExam() {
    return this.myExams().find(exam => exam.id === this.props.match.params.id);
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

export default connect(mapStateToProps, mapDispatchToProps)(CompleteExamPage)