import React from "react";
import PageWithRouting from '../PageWithRouting';
import { connect } from 'react-redux';
import styles from './CompleteExamPage.module.css';
import { userData } from '../../selectors/authSelectors';
import { completeExam, fetchExams, fetchGroups } from '../../actions/actions';
import _ from 'lodash'
import browserHistory from '../../history';

class CompleteExamPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answers: {}
    }
  }

  componentDidMount() {
    this.props.fetchExams();
    this.props.fetchGroups();
  }

  render() {
    const exam = this.selectedExam();
    if (exam) {
      return (
        <PageWithRouting title={'Exam'}>
          <div className={styles.container}>
            {exam.questions.map(question => this.renderQuestion(question))}
          </div>
          <div className={styles.submitContainer}>
            <button onClick={() => this.completeExam()}>Submit</button>
          </div>
        </PageWithRouting>
      );
    }
    return null;
  }

  completeExam() {
    const questions = this.selectedExam().questions;
    const score = questions.filter(question => `${_.indexOf(question.answers, this.state.answers[question.id])}` === question.correctAnswerIndex).length;
    this.props.completeExam(this.props.myId, this.selectedExam().id, `${score}`);
    browserHistory.push('/studentExams')
  }

  renderQuestion(question) {
    return (
      <div className={styles.question}>
        <div className={styles.questionText}>Question: {question.text}</div>
        <div className={styles.answers}>
          {question.answers.map(answer => this.renderAnswer(answer, question))}
        </div>
      </div>
    )
  }

  renderAnswer(answer, question) {
    return (
      <div className={styles.answer}>
        <input
          type={'radio'}
          className={styles.radio}
          checked={this.state.answers[question.id] === answer}
          onChange={(event) => {
            this.setState(state => ({
              answers: _.set(state.answers, question.id, answer)
            }))
          }} />
        <div className={styles.answerText}>{answer}</div>
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
  completeExam
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteExamPage)