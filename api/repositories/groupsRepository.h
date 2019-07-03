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

    if (!mongoc_collection_insert_one(
            collection, doc, NULL, NULL, &error)) {
        fprintf(stderr, "Error inserting document%s\n", error.message);
    }

    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();
}