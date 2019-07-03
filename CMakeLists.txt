cmake_minimum_required(VERSION 3.14)
project(test_exam C)

set(CMAKE_C_STANDARD 11)

find_package (libmongoc-1.0 1.14 REQUIRED)

message ("--   mongoc found version \"${MONGOC_VERSION}\"")
message ("--   mongoc include path \"${MONGOC_INCLUDE_DIRS}\"")
message ("--   mongoc libraries \"${MONGOC_LIBRARIES}\"")
add_executable(test_exam api/main.c api/http/httpServer.h api/base64/base64.h api/controllers/loginController.h api/idGenerator.h api/repositories/mongoRepositories.h api/repositories/userRepository.h api/http/httpServer.h api/http/httpDispatcher.h api/http/httpResposeStatus.h api/http/http.h api/base64/b64.h)

target_include_directories (test_exam PRIVATE "${MONGOC_INCLUDE_DIRS}")
target_link_libraries (test_exam PRIVATE "${MONGOC_LIBRARIES}" ulfius jansson)
target_compile_definitions (test_exam PRIVATE "${MONGOC_DEFINITIONS}")
