#include <jansson.h>
#include "../repositories/groupsRepository.h"

void createGroupController(char *requestBody, char responseBody[], char responseStatus[]) {

    json_error_t error;
    json_t *requestJson = json_loads(requestBody, 0, &error);
    json_t *groupName = json_object_get(requestJson, "groupName");

    const char *group = json_string_value(groupName);


    printf("group %s", group);
    createGroup(group);

    char status[statusBufferLength];
    strcpy(status, responseStatusOK);
    strncpy(responseStatus, status, strlen(status));
}
