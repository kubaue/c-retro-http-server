#include <stdio.h>
#include <sys/socket.h>
#include <unistd.h>
#include <stdlib.h>
#include <netinet/in.h>
#include <string.h>
#include "httpDispatcher.h"

#define PORT 8081

void runHttpServer() {
    int server_fd, socketId;
    struct sockaddr_in address;
    int addrlen = sizeof(address);

    char *hello = "Hello from server";

    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("In socket");
        exit(EXIT_FAILURE);
    }


    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    memset(address.sin_zero, '\0', sizeof address.sin_zero);


    if (bind(server_fd, (struct sockaddr *) &address, sizeof(address)) < 0) {
        perror("Error in bind");
        exit(EXIT_FAILURE);
    }
    if (listen(server_fd, 10) < 0) {
        perror("In in listen");
        exit(EXIT_FAILURE);
    }
    while (1) {
        if ((socketId = accept(server_fd, (struct sockaddr *) &address, (socklen_t *) &addrlen)) < 0) {
            perror("Error in accept\n");
            exit(EXIT_FAILURE);
        }

        char buffer[30000] = {0};
        read(socketId, buffer, 30000);
        dispatchHttpRequest(buffer);

        write(socketId, hello, strlen(hello));
        printf("Response sent\n");
        close(socketId);
    }
}