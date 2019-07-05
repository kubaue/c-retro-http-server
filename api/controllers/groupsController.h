#include <jansson.h>
#include "../repositories/groupsRepository.h"

void unauthorizedForGroupManipulations(char *responseStatus);

void getGroupsController(char *requestBody, char userRole[], char responseBody[], char responseStatus[]) {
    if (strcmp(userRole, "admin") == 0 || strcmp(userRole, "examiner") == 0) {
        char allGroupsJson[httpBufferLength];

        findAllGroups(allGroupsJson);

        char status[statusBufferLength];
        strcpy(status, responseStatusOK);
        strncpy(responseStatus, status, strlen(status));
        strncpy(responseBody, allGroupsJson, strlen(allGroupsJson));
    } else {
        unauthorizedForGroupManipulations(responseStatus);
    }
}

void createGroupController(char *requestBody, char userRole[], char responseBody[], char responseStatus[]) {
    if (strcmp(userRole, "admin") == 0) {
        json_error_t error;
        json_t *requestJson = json_loads(requestBody, 0, &error);
        json_t *groupName = json_object_get(requestJson, "groupName");

        const char *group = json_string_value(groupName);

        createGroup(group);

        char status[statusBufferLength];
        strcpy(status, responseStatusOK);
        strncpy(responseStatus, status, strlen(status));
    } else {
        unauthorizedForGroupManipulations(responseStatus);
    }
}

void assignStudentController(char *requestBody, char *userRole, char *responseBody, char *responseStatus) {
    if (strcmp(userRole, "admin") == 0) {
        json_error_t error;
        json_t *requestJson = json_loads(requestBody, 0, &error);
        json_t *groupIdJson = json_object_get(requestJson, "groupId");
        json_t *studentJson = json_object_get(requestJson, "student");

        const char *groupId = json_string_value(groupIdJson);
        const char *student = json_string_value(studentJson);

        assignStudentToGroup(groupId, student);

        char status[statusBufferLength];
        strcpy(status, responseStatusOK);
        strncpy(responseStatus, status, strlen(status));
    } else {
        unauthorizedForGroupManipulations(responseStatus);
    }
}

void removeStudentFromGroupController(char *requestBody, char userRole[], char responseBody[], char responseStatus[]) {
    if (strcmp(userRole, "admin") == 0) {
        json_error_t error;
        json_t *requestJson = json_loads(requestBody, 0, &error);
        json_t *groupIdJson = json_object_get(requestJson, "groupId");
        json_t *studentJson = json_object_get(requestJson, "student");

        const char *groupId = json_string_value(groupIdJson);
        const char *student = json_string_value(studentJson);

        removeStudentFromGroup(groupId, student);

        char status[statusBufferLength];
        strcpy(status, responseStatusOK);
        strncpy(responseStatus, status, strlen(status));
    } else {
        unauthorizedForGroupManipulations(responseStatus);
    }
}

void unauthorizedForGroupManipulations(char *responseStatus) {
    char status[statusBufferLength];
    memset(status, '\0', statusBufferLength);
    strcpy(status, responseStatusUnauthorized);
    memset(responseStatus, '\0', httpBufferLength);
    strncpy(responseStatus, status, strlen(status));
}
