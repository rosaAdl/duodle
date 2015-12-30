/**
 * Aggregates `EventEmitter`s
 */
function UserService (io) {
  this.io = io;
  this.users = {};
}

UserService.prototype.usersInRoom = function (room) {
  var results = [];

  for (var socketId in this.io.nsps['/'].adapter.rooms[room]) {
      results.push(this.users[socketId]);
      console.log("Users: " + JSON.stringify(this.users));
  }
  console.log("Users in room (" + room + ") are: " + JSON.stringify(results));
  return results;
};

UserService.prototype.registerUser = function (socket, newUser) {
  socket.join(newUser.room);
  this.users[socket.id] = newUser;
  var usersInRoom = this.usersInRoom(newUser.room);
  newUser.avatar = 'svg-' + usersInRoom.length;

  this.io.sockets.in(newUser.room).emit('new user joined', usersInRoom);
  console.log("new user joined: " + JSON.stringify(newUser.name));
};

module.exports = function (io) {
  return new UserService (io);
};
