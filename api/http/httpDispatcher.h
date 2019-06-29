#include <stdio.h>
#include <stdlib.h>
#define BUFFER_LENGTH 16

void extractPath(char dest[], char *httpRequest, int httpMethodLength);

void extractMethod(char dest[], char *httpRequest);

int lengthBeforeNextSpace(const char *inputString);

void dispatchHttpRequest(char *httpRequest) {
    char method[BUFFER_LENGTH];
    char path[BUFFER_LENGTH];

    extractMethod(method, httpRequest);
    extractPath(path, httpRequest, strlen(method));

    printf("method: |%s|\n", method);
    printf("path: |%s|\n", path);

    printf("\n%s\n", httpRequest);
}

void extractMethod(char dest[], char *httpRequest) {
    memset(dest, '\0', BUFFER_LENGTH);
    strncpy(dest, httpRequest, lengthBeforeNextSpace(httpRequest));
}

void extractPath(char dest[], char *httpRequest, int httpMethodLength) {
    char *strippedFromMethodRequest = httpRequest + httpMethodLength + 1;

    memset(dest, '\0', BUFFER_LENGTH);
    strncpy(dest, strippedFromMethodRequest, lengthBeforeNextSpace(strippedFromMethodRequest));
}

int lengthBeforeNextSpace(const char *inputString) {
    int count = 0;
    for (int i = 0; i < sizeof(inputString); i++) {
        if (inputString[i] == ' ') {
            return count;
        }
        count += 1;
    }

    return -1;
}
