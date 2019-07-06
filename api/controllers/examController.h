#include <jansson.h>
#include <string.h>
#include "../repositories/examRepository.h"

void createExamController(char *requestBody, char userRole[], char responseBody[], char responseStatus[]) {
    if (strcmp(userRole, "examiner") == 0) {
        json_error_t error;
        json_t *requestJson = json_loads(requestBody, 0, &error);

        createExam(requestJson);

        char status[statusBufferLength];
        strcpy(status, responseStatusOK);
        strncpy(responseStatus, status, strlen(status));
    } else {
        char status[statusBufferLength];
        memset(status, '\0', statusBufferLength);
        strcpy(status, responseStatusUnauthorized);
        memset(responseStatus, '\0', 1024);
        strncpy(responseStatus, status, strlen(status));
    }
}

void getExamsController(char *requestBody, char userRole[], char responseBody[], char responseStatus[]) {
    if (strcmp(userRole, "examiner") == 0 || strcmp(userRole, "student") == 0) {
        char allExamsJson[httpBufferLength];

        findAllExams(allExamsJson);

        char status[statusBufferLength];
        strcpy(status, responseStatusOK);
        strncpy(responseStatus, status, strlen(status));
        strncpy(responseBody, allExamsJson, strlen(allExamsJson));
    } else {
        char status[statusBufferLength];
        memset(status, '\0', statusBufferLength);
        strcpy(status, responseStatusUnauthorized);
        memset(responseStatus, '\0', 1024);
        strncpy(responseStatus, status, strlen(status));
    }
}

void compleExamController(char *requestBody, char userRole[], char responseBody[], char responseStatus[]) {
    if (strcmp(userRole, "student") == 0) {
        json_error_t error;
        json_t *requestJson = json_loads(requestBody, 0, &error);

        completeExam(requestJson);

        char status[statusBufferLength];
        strcpy(status, responseStatusOK);
        strncpy(responseStatus, status, strlen(status));
    } else {
        char status[statusBufferLength];
        memset(status, '\0', statusBufferLength);
        strcpy(status, responseStatusUnauthorized);
        memset(responseStatus, '\0', 1024);
        strncpy(responseStatus, status, strlen(status));
    }
}


void getCompletedExamsController(char *requestBody, char userRole[], char responseBody[], char responseStatus[]) {
    if (strcmp(userRole, "examiner") == 0 || strcmp(userRole, "student") == 0) {
        char allExamsJson[httpBufferLength];

        findAllCompletedExams(allExamsJson);

        char status[statusBufferLength];
        strcpy(status, responseStatusOK);
        strncpy(responseStatus, status, strlen(status));
        strncpy(responseBody, allExamsJson, strlen(allExamsJson));
    } else {
        char status[statusBufferLength];
        memset(status, '\0', statusBufferLength);
        strcpy(status, responseStatusUnauthorized);
        memset(responseStatus, '\0', 1024);
        strncpy(responseStatus, status, strlen(status));
    }
}