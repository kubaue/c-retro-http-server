import React from "react";
import PageWithRouting from '../PageWithRouting';
import { connect } from 'react-redux';
import styles from './CreateExamPage.module.css';
import { userData } from '../../selectors/authSelectors';
import { createExam, fetchGroups } from '../../actions/actions';

class CreateExamPage extends React.Component {

  componentDidMount() {
    this.props.fetchGroups();
  }

  constructor(props) {
    super(props);
    this.state = {
      groupId: ''
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
                <option value={''}/>
                {this.props.groups.map(group => <option key={group.id} value={group.id}>{group.groupName}</option>)}
              </select>
            </div>
            <div className={styles.addQuestionButton}>
              <button onClick={() => this.addQuestion()}>Add question</button>
            </div>
            <div className={styles.createExamContainer}>
              <button onClick={() => this.createExam()}>Create</button>
            </div>
          </div>
        </PageWithRouting>
      );
    }
    return null;
  }

  createExam() {
    this.props.createExam();
  }

  addQuestion() {

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