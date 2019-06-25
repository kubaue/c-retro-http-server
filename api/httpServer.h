#include <ulfius.h>
#include <stdio.h>
#include "./controllers/helloController.h"
#include "./controllers/loginController.h"

#define PORT 8080

void runHttpServer() {
    struct _u_instance instance;

    // Initialize instance with the port number
    if (ulfius_init_instance(&instance, PORT, NULL, NULL) != U_OK) {
        fprintf(stderr, "Error ulfius_init_instance, abort\n");
        exit(1);
    }

    // Endpoint list declaration
    ulfius_add_endpoint_by_val(&instance, "GET", "/hello", NULL, 0, &helloController, NULL);
    ulfius_add_endpoint_by_val(&instance, "GET", "/login", NULL, 0, &loginController, NULL);

    // Start the framework
    if (ulfius_start_framework(&instance) == U_OK) {
        printf("Start framework on port %d\n", instance.port);
    } else {
        fprintf(stderr, "Error starting framework\n");
    }

    // instant shutdown prevention
    while(1) {
        getchar();
    }

//    printf("End framework\n");
//
//    ulfius_stop_framework(&instance);
//    ulfius_clean_instance(&instance);

}