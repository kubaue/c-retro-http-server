import React from "react";
import PageWithRouting from '../PageWithRouting';
import { connect } from 'react-redux';
import styles from './CreateExamPage.module.css';
import { userData } from '../../selectors/authSelectors';
import { createExam, fetchGroups } from '../../actions/actions';
import _ from 'lodash';
import browserHistory from '../../history';

class CreateExamPage extends React.Component {

  componentDidMount() {
    this.props.fetchGroups();
  }

  constructor(props) {
    super(props);
    this.state = {
      groupId: '',
      questions: []
    }
  }

  render() {
    if (this.props.role === 'examiner') {
      return (
        <PageWithRouting title={'Create exam'}>
          <div className={styles.container}>
            <div className={styles.group}>
              <label className={styles.label}>Group</label>
              <select onChange={(event) => this.setState({ groupId: event.target.value })} value={this.state.groupId}>
                <option value={''} />
                {this.props.groups.map(group => <option key={group.id} value={group.id}>{group.groupName}</option>)}
              </select>
            </div>
            <div className={styles.questions}>
              {this.state.questions.map(question => this.renderQuestion(question))}
            </div>
            <div className={styles.createExamContainer}>
              <button className={styles.button} onClick={() => this.addQuestion()}>Add question</button>
              <button className={styles.button} onClick={() => this.createExam()}>Create</button>
            </div>
          </div>
        </PageWithRouting>
      );
    }
    return null;
  }

  createExam() {
    this.props.createExam(this.state.groupId, this.state.questions);
    browserHistory.push('/exams')
  }

  addQuestion() {
    const localId = _.uniqueId();
    this.setState(state => ({
      questions: [...state.questions, {
        text: '',
        correctAnswerIndex: '0',
        answers: [],
        localId: localId
      }]
    }))
  }

  renderQuestion(question) {
    return (
      <div key={question.localId} className={styles.question}>
        <div className={styles.questionRow}>
          <label>Question</label>
          <input value={question.text} onChange={(event) => {
            const newValue = event.target.value;
            return this.setState(state => ({
              questions: state.questions.map(q => {
                if (q.localId === question.localId) {
                  return ({ ...q, text: newValue });
                } else {
                  return q;
                }
              })
            }));
          }} />
        </div>
        <div className={styles.answersContainer}>
          <h4>Answers</h4>
        </div>
        {question.answers.map(answer => this.renderAnswer(question, answer))}
        <div className={styles.addAnswerContainer}>
          <button className={styles.button} onClick={() => this.setState(state => ({
            questions: state.questions.map(q => {
              if (q.localId === question.localId) {
                return { ...q, answers: [...q.answers, ""] }
              }
              return q;
            })
          }))}>Add answer
          </button>
        </div>
      </div>
    )
  }

  renderAnswer(question, answer) {
    const answerIndex = _.indexOf(question.answers, answer);
    const correctAnswerIndex = Number(question.correctAnswerIndex);
    return (
      <div className={styles.answer} key={answer.localId}>
        <input value={answer} onChange={(event) => {
          const newValue = event.target.value;
          return this.setState(state => ({
            questions: state.questions.map(q => {
              if (q.localId === question.localId) {
                return ({
                  ...q, answers: q.answers.map((a, aIndex) => {
                    if (aIndex === answerIndex) {
                      return newValue;
                    }
                    return a;
                  })
                });
              } else {
                return q;
              }
            })
          }));
        }} />
        <input type={'radio'} onChange={() => this.setState(state => ({
          questions: state.questions.map(q => {
            if (q.localId === question.localId) {
              return { ...q, correctAnswerIndex: `${answerIndex}` }
            }
            return q;
          })
        }))} checked={correctAnswerIndex === answerIndex} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    exams: state.exams.entries,
    role: userData(state).role,
    groups: state.groups.entries
  };
};

const mapDispatchToProps = {
  createExam,
  fetchGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateExamPage)