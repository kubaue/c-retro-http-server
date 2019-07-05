export const ActionType = {
  LOG_IN: 'LOG_IN',
  LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
  LOG_IN_FAILED: 'LOG_IN_FAILED',
  LOG_OUT: 'LOG_OUT',
  API_ERROR_OCCURRED: 'API_ERROR_OCCURRED',
  FETCH_GROUPS: 'FETCH_GROUPS',
  FETCH_GROUPS_SUCCESS: 'FETCH_GROUPS_SUCCESS',
  FETCH_STUDENTS: 'FETCH_STUDENTS',
  FETCH_STUDENTS_SUCCESS: 'FETCH_STUDENTS_SUCCESS',
  ASSIGN_STUDENT: 'ASSIGN_STUDENT',
  ASSIGN_STUDENT_SUCCESS: 'ASSIGN_STUDENT_SUCCESS',
  REMOVE_STUDENT: 'REMOVE_STUDENT',
  REMOVE_STUDENT_SUCCESS: 'ASSIGN_STUDENT_SUCCESS'
};

export const logIn = (login, password) => {
  return {
    type: ActionType.LOG_IN,
    payload: {
      login,
      password
    }
  }
};

export const logOut = () => {
  return {
    type: ActionType.LOG_OUT,
    payload: {}
  }
};

export const logInSuccess = (token) => {
  return {
    type: ActionType.LOG_IN_SUCCESS,
    payload: {
      token
    }
  }
};

export const logInFailed = () => {
  return {
    type: ActionType.LOG_IN_FAILED,
    payload: {}
  }
};

export const apiErrorOccurred = (error) => {
  return {
    type: ActionType.API_ERROR_OCCURRED,
    payload: {
      error
    }
  }
};

export const fetchGroups = () => {
  return {
    type: ActionType.FETCH_GROUPS,
    payload: {}
  }
};

export const fetchGroupsSuccess = (groups) => {
  return {
    type: ActionType.FETCH_GROUPS_SUCCESS,
    payload: {
      groups
    }
  }
};

export const fetchStudents = () => {
  return {
    type: ActionType.FETCH_STUDENTS,
    payload: {}
  }
};

export const fetchStudentsSuccess = (students) => {
  return {
    type: ActionType.FETCH_STUDENTS_SUCCESS,
    payload: {
      students
    }
  }
};

export const assignStudent = (groupId, studentId) => {
  return {
    type: ActionType.ASSIGN_STUDENT,
    payload: {}
  }
};

export const assignStudentSuccess = () => {
  return {
    type: ActionType.ASSIGN_STUDENT_SUCCESS,
    payload: {}
  }
};

export const removeStudent = (groupId, studentId) => {
  return {
    type: ActionType.REMOVE_STUDENT,
    payload: {}
  }
};

export const removeStudentSuccess = () => {
  return {
    type: ActionType.REMOVE_STUDENT_SUCCESS,
    payload: {}
  }
};