#include <bson/bson.h>
#include <mongoc/mongoc.h>
#include <stdio.h>
#include <jansson.h>
#include "./mongoRepositories.h"
#include "../idGenerator.h"

void createExam(json_t *examJson) {
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    bson_error_t error;
    bson_oid_t oid;
    bson_t *doc;
    bson_t child;
    bson_t child2;
    bson_t child3;
    size_t keylen;
    size_t keylen2;
    const char *key;
    const char *key2;
    char buf[32];
    char buf2[32];

    mongoc_init();

    client = mongoc_client_new(connectionUrl);
    collection = mongoc_client_get_collection(client, dbName, "exams");

    doc = bson_new();
    bson_oid_init(&oid, NULL);
    BSON_APPEND_OID (doc, "_id", &oid);

    int rawId = generateId();
    char examId[idLength];
    sprintf(examId, "%i", rawId);

    json_t *groupIdJson = json_object_get(examJson, "groupId");
    const char *groupId = json_string_value(groupIdJson);

    BSON_APPEND_UTF8 (doc, "id", examId);
    BSON_APPEND_UTF8 (doc, "groupId", groupId);

    json_t *questions = json_object_get(examJson, "questions");

    BSON_APPEND_ARRAY_BEGIN (doc, "questions", &child);
    for (int i = 0; i < json_array_size(questions); i++) {
        json_t *question = json_array_get(questions, i);
        json_t *textJson = json_object_get(question, "text");
        json_t *correctAnswerIndexJson = json_object_get(question, "correctAnswerIndex");
        json_t *answers = json_object_get(question, "answers");

        const char *text = json_string_value(textJson);
        const char *correctAnswerIndex = json_string_value(correctAnswerIndexJson);

        keylen = bson_uint32_to_string(i, &key, buf, sizeof buf);
        bson_append_document_begin(&child, key, (int) keylen, &child2);
        BSON_APPEND_UTF8 (&child2, "text", text);
        BSON_APPEND_UTF8 (&child2, "correctAnswerIndex", correctAnswerIndex);


        BSON_APPEND_ARRAY_BEGIN (&child2, "answers", &child3);
        for (int j = 0; j < json_array_size(answers); j++) {
            json_t *answer = json_array_get(answers, j);
            keylen2 = bson_uint32_to_string (j, &key2, buf2, sizeof buf2);
            const char *answerAsString = json_string_value(answer);
            bson_append_utf8 (&child3, key2, (int) keylen2, answerAsString, -1);
        }
        bson_append_array_end (&child2, &child3);


        bson_append_document_end(&child, &child2);
    }
    bson_append_array_end(doc, &child);
    if (!mongoc_collection_insert_one(
            collection, doc, NULL, NULL, &error)) {
        fprintf(stderr, "Error inserting document%s\n", error.message);
    }

    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();
}


void findAllExams(char dest[]) {
    mongoc_client_t *client;
    mongoc_collection_t *collection;
    mongoc_cursor_t *cursor;
    const bson_t *doc;
    bson_t *query;
    int first = 1;

    mongoc_init();

    client = mongoc_client_new(connectionUrl);
    collection = mongoc_client_get_collection(client, dbName, "exams");

    query = bson_new();
    cursor = mongoc_collection_find_with_opts(collection, query, NULL, NULL);

    strcpy(dest, "{\"exams\": [\n");
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