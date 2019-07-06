#include <stdio.h>
#include <sys/socket.h>
#include <unistd.h>
#include <stdlib.h>
#include <netinet/in.h>
#include <string.h>
#include "httpDispatcher.h"

#define PORT 8080
#define ALTERNATIVE_PORT 8081

int bindOnPort(int server_fd, struct sockaddr_in *address);

void runHttpServer() {
    int server_fd, socketId;
    struct sockaddr_in address;
    int addrlen = sizeof(address);

    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("In socket");
        exit(EXIT_FAILURE);
    }

    int portUsed = PORT;
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(portUsed);

    memset(address.sin_zero, '\0', sizeof address.sin_zero);

    if (bindOnPort(server_fd, &address) < 0) {
        portUsed = ALTERNATIVE_PORT;
        address.sin_port = htons(portUsed);
        bindOnPort(server_fd, &address);
    }
    if (listen(server_fd, 10) < 0) {
        perror("In in listen");
        exit(EXIT_FAILURE);
    }

    printf("Running on port %i\n", portUsed);

    char httpResponse[httpBufferLength];
    while (1) {
        if ((socketId = accept(server_fd, (struct sockaddr *) &address, (socklen_t *) &addrlen)) < 0) {
            perror("Error in accept\n");
            exit(EXIT_FAILURE);
        }

        char buffer[30000] = {0};
        read(socketId, buffer, 30000);
        dispatchHttpRequest(buffer, httpResponse);

        write(socketId, httpResponse, strlen(httpResponse));
        close(socketId);
    }
}

int bindOnPort(int server_fd, struct sockaddr_in *address) {
    return bind(server_fd, (struct sockaddr *) address, sizeof((*address)));
}