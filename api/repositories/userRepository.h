#include <bson/bson.h>
#include <mongoc/mongoc.h>
#include <stdio.h>
#include "./mongoRepositories.h"

json_t *findUserByLogin(const char *login) {
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    mongoc_cursor_t *cursor;
    const bson_t *doc;
    bson_t *query;
    char *asString;

    mongoc_init();

    client = mongoc_client_new(connectionUrl);
    collection = mongoc_client_get_collection(client, dbName, "users");

    query = BCON_NEW("login", login);
    cursor = mongoc_collection_find_with_opts(collection, query, NULL, NULL);

    while (mongoc_cursor_next(cursor, &doc)) {
        asString = bson_as_canonical_extended_json(doc, NULL);

        json_error_t error;

        json_t *asJson = json_loads(asString, 0, &error);

        bson_free(asString);
        return asJson;
    }

    bson_destroy(query);
    mongoc_cursor_destroy(cursor);
    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();
}


void findAllStudents(char dest[]) {
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    mongoc_cursor_t *cursor;
    const bson_t *doc;
    bson_t *query;
    int first = 1;

    mongoc_init();

    client = mongoc_client_new(connectionUrl);
    collection = mongoc_client_get_collection(client, dbName, "users");

    query = BCON_NEW("role", "student");
    cursor = mongoc_collection_find_with_opts(collection, query, NULL, NULL);

    strcpy(dest, "{\"students\": [\n");
    while (mongoc_cursor_next(cursor, &doc)) {
        if (first == 1) {
            first = 0;
        } else {
            strcat(dest, ",\n");
        }

        char *currentRawEntry = bson_as_canonical_extended_json(doc, NULL);

        json_error_t error;
        json_t *requestJson = json_loads(currentRawEntry, 0, &error);
        json_t *id = json_object_get(requestJson, "id");
        json_t *name = json_object_get(requestJson, "name");

        char currentEntry[100];
        memset(currentEntry, '\0', 100);
        sprintf(currentEntry, "{\"id\": \"%s\", \"name\": \"%s\"}", json_string_value(id), json_string_value(name));

        strcat(dest, currentEntry);
    }
    strcat(dest, "\n]\n}");

    bson_destroy(query);
    mongoc_cursor_destroy(cursor);
    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();
}