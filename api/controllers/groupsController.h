#include <jansson.h>
#include "../repositories/groupsRepository.h"

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
        char status[statusBufferLength];
        memset(status, '\0', statusBufferLength);
        strcpy(status, responseStatusUnauthorized);
        memset(responseStatus, '\0', httpBufferLength);
        strncpy(responseStatus, status, strlen(status));
    }
}
