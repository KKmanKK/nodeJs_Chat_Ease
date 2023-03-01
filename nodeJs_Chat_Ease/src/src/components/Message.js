import React, { useContext } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Input,
  Button,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { Context } from "..";

export const Message = ({ mess, user, event }) => {
  const { userStore, messageStore } = useContext(Context);

  return (
    <HStack
      w="100%"
      d="flex"
      justifyContent={userStore.user.id !== user.id ? "start" : "end"}
    >
      <Box backgroundColor="white" borderRadius={3} p={3}>
        <Text maxW="30vw">
          {event === "connect"
            ? `Пользователь с именем ${user.name} подключился`
            : mess}
        </Text>
      </Box>
    </HStack>
  );
};
