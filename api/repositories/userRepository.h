#include <bson/bson.h>
#include <mongoc/mongoc.h>
#include <stdio.h>
#include "./mongoRepositories.h"

json_t * findUserByLogin(const char *login) {
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    mongoc_cursor_t *cursor;
    const bson_t *doc;
    bson_t *query;
    char *asString;

    mongoc_init();

    client = mongoc_client_new("mongodb://admin:qwe123@ds263156.mlab.com:63156/pap-test-exam");
    collection = mongoc_client_get_collection(client, "pap-test-exam", "users");

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