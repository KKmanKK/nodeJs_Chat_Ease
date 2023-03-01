import "./App.css";
import { Box, Container, Text } from "@chakra-ui/react";
import { AuthComponents } from "./components/AuthComponents";
import { ChatComponents } from "./components/ChatComponents";
import { useContext, useRef, useState } from "react";

import { observer } from "mobx-react-lite";
import { Context } from ".";

function App() {
  const [connected, setConnected] = useState(false);
  const socket = useRef();
  const { userStore, messageStore } = useContext(Context);

  const connect = () => {
    socket.current = new WebSocket(
      "ws://nodejschatease-production.up.railway.app"
    );

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connect",
        user: userStore.user,
        id: Number(new Date().toLocaleTimeString().split(":").join("")),
      };

      console.log("Connected");
      socket.current.send(JSON.stringify(message));
    };

    socket.current.onmessage = (mess) => {
      const message = JSON.parse(mess.data);
      messageStore.addMessage(message);
    };

    socket.current.onclose = () => {
      console.log("CLOSE");
    };

    socket.current.onerror = () => {
      console.log("ERROR");
    };
  };

  const sendMessage = (mess) => {
    const message = {
      event: "message",
      user: userStore.user,
      message: mess,
      id: Number(new Date().toLocaleTimeString().split(":").join("")),
    };
    socket.current.send(JSON.stringify(message));
  };

  if (!connected) {
    return (
      <div className="App">
        <Container maxW="xl" centerContent mt="10px">
          <Box
            backgroundColor="#F56565"
            p="10px"
            pos="relative"
            borderRadius={3}
            minW="300px"
            w={[300, 400, 500, 600]}
          >
            <AuthComponents connect={connect} />
          </Box>
        </Container>
      </div>
    );
  }

  return (
    <div className="App">
      <Container maxW="xl" centerContent mt="10px">
        <Box
          backgroundColor="#F56565"
          minW="300px"
          w={[300, 400, 500, 600]}
          p="10px"
          borderRadius={3}
        >
          <Text
            fontWeight="bold"
            fontSize="2xl"
            color="black"
            fontFamily="cursive"
            backgroundColor="white"
            borderRadius={2}
            mb={2}
          >
            Chatic
          </Text>
          <ChatComponents sendMessage={sendMessage} />
        </Box>
      </Container>
    </div>
  );
}

export default observer(App);
