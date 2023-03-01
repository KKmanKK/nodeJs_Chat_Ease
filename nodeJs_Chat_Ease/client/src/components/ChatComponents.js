import React, { useContext, useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { Message } from "./Message";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { toJS } from "mobx";
export const ChatComponents = observer(({ sendMessage }) => {
  const [mess, setMess] = useState("");
  const { userStore, messageStore } = useContext(Context);
  const [isDisabl, setIsDisabl] = useState(true);
  useEffect(() => {
    mess ? setIsDisabl(false) : setIsDisabl(true);
  }, [mess]);
  const onSendMess = () => {
    sendMessage(mess);
    setMess("");
  };
  const onChangeHandler = (e) => {
    setMess(e.target.value);
  };
  return (
    <>
      <Box position="relative" h="66vh">
        <Box h="60vh" overflowY="auto" pb={4}>
          <VStack w="100%">
            {toJS(messageStore.messages).map((mess) => {
              return (
                <Message
                  key={mess.id}
                  event={mess?.event}
                  user={mess?.user}
                  mess={mess?.message}
                />
              );
            })}
          </VStack>
        </Box>
        <HStack position="absolute" zIndex={2} bottom={1} w="100%">
          <FormControl display="flex" alignItems="center">
            <Input
              placeholder="Введите сообщение"
              backgroundColor="white"
              value={mess}
              onChange={onChangeHandler}
            />
          </FormControl>
          <Button
            type="submit"
            backgroundColor="White"
            isDisabled={isDisabl}
            onClick={onSendMess}
          >
            Отправить
          </Button>
        </HStack>
      </Box>
    </>
  );
});
