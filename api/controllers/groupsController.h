#include <jansson.h>
#include "../repositories/groupsRepository.h"

void unauthorizedForGroupManipulations(char *responseStatus);

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
    }
    else {
        unauthorizedForGroupManipulations(responseStatus);
    }
}

//void editGroupController(char *requestBody, char userRole[], char responseBody[], char responseStatus[]) {
//
//    if (strcmp(userRole, "admin") == 0) {
//        json_error_t error;
//        json_t *requestJson = json_loads(requestBody, 0, &error);
//        json_t *students = json_object_get(requestJson, "students");
//
//        const char *group = json_string_value(groupName);
//
//        createGroup(group);
//
//        char status[statusBufferLength];
//        strcpy(status, responseStatusOK);
//        strncpy(responseStatus, status, strlen(status));
//    }
//    else {
//        unauthorizedForGroupManipulations(responseStatus);
//    }
//}

void unauthorizedForGroupManipulations(char *responseStatus) {
    char status[statusBufferLength];
    memset(status, '\0', statusBufferLength);
    strcpy(status, responseStatusUnauthorized);
    memset(responseStatus, '\0', httpBufferLength);
    strncpy(responseStatus, status, strlen(status));
}
