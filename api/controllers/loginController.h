#include <string.h>
#include "../base64.h"
#include "../idGenerator.h"
#include "../http/httpResposeStatus.h"

void loginController(char *requestBody, char responseBody[], char responseStatus[]) {
    char *response = "{\"token\": \"eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoiQWRtaW4ifQ\"}";
    strncpy(responseBody, response, strlen(response));

    char status[statusBufferLength];
    strcpy(status,responseStatusOK);
    strncpy(responseStatus, status, strlen(status));
}
