import React from "react";
import PageWithRouting from '../PageWithRouting';
import { connect } from 'react-redux';
import { createGroup, fetchGroups, fetchStudents } from '../../actions/actions';
import styles from './GroupsPage.module.css';

class GroupsPage extends React.Component {

  componentDidMount() {
    this.props.fetchGroups();
    this.props.fetchStudents();
  }

  render() {
    if (this.selectedGroup()) {
      return (
        <PageWithRouting title={this.selectedGroup().groupName}>
          {/*<div className={styles.container}>*/}
          {/*<div className={`${styles.group} ${styles.header}`}>*/}
          {/*<div className={styles.groupId}>Group ID</div>*/}
          {/*<div className={styles.groupName}>Name</div>*/}
          {/*</div>*/}
          {/*{this.props.groups.map(group => this.renderGroup(group))}*/}
          {/*<div className={styles.createGroupContainer}>*/}
          {/*<input onChange={(event) => this.setState({groupName: event.target.value})} value={this.state.groupName}/>*/}
          {/*<button onClick={() => this.createGroup()}>Create group</button>*/}
          {/*</div>*/}
          {/*</div>*/}
        </PageWithRouting>
      );
    }
    return null;
  }

  renderGroup(group) {
    return <div
      onClick={() => this.navigateToGroup(group)}
      className={styles.group}
      key={group.id}
    >
      <div className={styles.groupId}>{group.id}</div>
      <div className={styles.groupName}>{group.groupName}</div>
    </div>
  }

  selectedGroup() {
    return this.props.groups.find(group => group.id === this.props.match.params.id);
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
  createGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage)