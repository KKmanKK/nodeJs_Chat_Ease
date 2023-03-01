import React, { useContext, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
export const AuthComponents = observer(({ connect }) => {
  const [name, setName] = useState("");
  const { userStore } = useContext(Context);
  const onConnect = () => {
    userStore.addUser({
      name,
      id: Number(new Date().toLocaleTimeString().split(":").join("")),
    });
    connect();
  };

  return (
    <HStack>
      <FormControl display="flex" alignItems="center">
        <Input
          placeholder="Введите свое имя"
          type="Login"
          backgroundColor="white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <Button backgroundColor="White" onClick={onConnect}>
        Ввойти
      </Button>
    </HStack>
  );
});
