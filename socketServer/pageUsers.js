import { payloadUsers } from "../actions";
import { payloadTeams } from "../actions";

export default async ({ socket, user: { role, id , teams}, adapter }) => {
  const { users: 
              { getUsers = () => {},
                getTeams = () => {}
               } = {} } = adapter;

  const users = await getUsers();
  const teamList = await getTeams();

  socket.emit("action", payloadUsers({ data: users }));
  socket.emit("action", payloadTeams(teamList));
};
