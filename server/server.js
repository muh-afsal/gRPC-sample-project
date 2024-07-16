const PROTO_PATH = "./proto/user.proto";

import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { v4 as uuid } from 'uuid';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const userProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

let users = [{
    name: "jay",
    email: "jay@gmail.com",
    age: 12
}];

server.addService(userProto.UserService.service, {
    getUsers: (_, callback) => {
        callback(null, {users});
    },
    addUser: (call, callback) => {
        const user = call.request;
        users.push(user);
        callback(null, user);
    }
});

const address = "127.0.0.1:30043";
server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(`Server started on port ${port}`);
});
