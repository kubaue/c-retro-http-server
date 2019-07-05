import React from "react";
import PageWithRouting from '../PageWithRouting';
import { connect } from 'react-redux';
import { fetchGroups, fetchStudents } from '../../actions/actions';

class GroupsPage extends React.Component {

  componentDidMount() {
    this.props.fetchGroups();
    this.props.fetchStudents();
  }

  render() {
    return (
      <PageWithRouting title={'Home'}>
        <div>Groups</div>
      </PageWithRouting>
    );
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
  fetchStudents
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage)