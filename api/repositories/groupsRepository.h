#include <bson/bson.h>
#include <mongoc/mongoc.h>
#include <stdio.h>
#include <jansson.h>
#include "./mongoRepositories.h"

void createGroup(const char *newGroupName) {
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    bson_error_t error;
    bson_oid_t oid;
    bson_t *doc;
    bson_t child;

    mongoc_init();

    client = mongoc_client_new(connectionUrl);
    collection = mongoc_client_get_collection(client, dbName, "groups");

    doc = bson_new();
    bson_oid_init(&oid, NULL);
    BSON_APPEND_OID (doc, "_id", &oid);

    int rawId = generateId();
    char groupId[idLength];
    sprintf(groupId, "%i", rawId);

    char groupName[100];
    strcpy(groupName, newGroupName);

    BSON_APPEND_UTF8 (doc, "id", groupId);
    BSON_APPEND_UTF8 (doc, "groupName", groupName);
    BSON_APPEND_ARRAY_BEGIN (doc, "students", &child);
    bson_append_array_end(doc, &child);


    if (!mongoc_collection_insert_one(
            collection, doc, NULL, NULL, &error)) {
        fprintf(stderr, "Error inserting document%s\n", error.message);
    }

    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();
}

void assignStudentToGroup(const char *groupId, const char *student) {
    mongoc_collection_t *collection;
    mongoc_client_t *client;
    bson_error_t error;
    bson_oid_t oid;
    bson_t *update = NULL;
    bson_t *query = NULL;

    mongoc_init();

    client = mongoc_client_new(connectionUrl);
    collection = mongoc_client_get_collection(client, dbName, "groups");

    bson_oid_init(&oid, NULL);

    query = BCON_NEW("id", groupId);

    update = BCON_NEW ("$push", "{", "students", BCON_UTF8(student), "}");

    if (!mongoc_collection_update_one(
            collection, query, update, NULL, NULL, &error)) {
        fprintf(stderr, "%s\n", error.message);
    }

    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();
}

void removeStudentFromGroup(const char *groupId, const char *student) {
    mongoc_collection_t *collection;
    mongoc_client_t *client;
    bson_error_t error;
    bson_oid_t oid;
    bson_t *update = NULL;
    bson_t *query = NULL;

    mongoc_init();

    client = mongoc_client_new(connectionUrl);
    collection = mongoc_client_get_collection(client, dbName, "groups");

    bson_oid_init(&oid, NULL);

    query = BCON_NEW("id", groupId);

    update = BCON_NEW ("$pull", "{", "students", BCON_UTF8(student), "}");

    if (!mongoc_collection_update_one(
            collection, query, update, NULL, NULL, &error)) {
        fprintf(stderr, "%s\n", error.message);
    }

    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();
}

void findAllGroups(char dest[]) {
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    mongoc_cursor_t *cursor;
    const bson_t *doc;
    bson_t *query;
    int first = 1;

    mongoc_init();

    client = mongoc_client_new(connectionUrl);
    collection = mongoc_client_get_collection(client, dbName, "groups");

    query = bson_new();
    cursor = mongoc_collection_find_with_opts(collection, query, NULL, NULL);

    strcpy(dest, "{\"groups\": [\n");
    while (mongoc_cursor_next(cursor, &doc)) {
        if(first == 1) {
            first = 0;
        } else {
            strcat(dest, ",\n");
        }

        char *currentEntry = bson_as_canonical_extended_json(doc, NULL);
        strcat(dest, currentEntry);
    }
    strcat(dest, "\n]\n}");

    bson_destroy(query);
    mongoc_cursor_destroy(cursor);
    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();
}