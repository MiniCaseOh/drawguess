import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import CommonContext from '~utils/CommonContext';

import Button from '~components/Button';

const Home = () => {
  const { ws, user, game } = useContext(CommonContext);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [deferredCreate, setDeferredCreate] = useState<boolean>(false);
  const [deferredJoin, setDeferredJoin] = useState<boolean>(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    ws.send(
      JSON.stringify({
        type: 'register',
        payload: { name },
      })
    );
    setDeferredCreate(true);
  };

  useEffect(() => {
    if (deferredCreate && user) {
      ws.send(
        JSON.stringify({
          type: 'create-game',
          payload: { user },
        })
      );
      setDeferredCreate(false);
    }
  }, [user]);

  const handleGo = (e) => {
    e.preventDefault();
    ws.send(
      JSON.stringify({
        type: 'register',
        payload: { name },
      })
    );
    setDeferredJoin(true);
  };

  useEffect(() => {
    if (deferredJoin && user) {
      ws.send(
        JSON.stringify({
          type: 'join',
          payload: { user, code },
        })
      );
      setDeferredJoin(false);
    }
  });

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  if (game && game.code) {
    return <Redirect to={`/game/${game.code}`} />;
  }

  return (
    <Wrapper>
      <Header>Welcome to drawguess</Header>
      <Create>
        <Name
          type="text"
          placeholder="Nickname"
          value={name}
          onChange={handleNameChange}
        ></Name>
        <Button fontSize={24} onClick={handleCreate}>
          Create a new game
        </Button>
      </Create>
      <Or>OR</Or>
      <Join>Join an existing game</Join>
      <BottomRow onSubmit={handleGo}>
        <InputWrapper>
          <Name
            type="text"
            placeholder="Nickname"
            value={name}
            onChange={handleNameChange}
          ></Name>
          <Code
            type="text"
            placeholder="Game code"
            value={code}
            onChange={handleCodeChange}
          ></Code>
        </InputWrapper>
        <Button>Go</Button>
      </BottomRow>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Create = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.h1``;

const Or = styled.h3``;

const Join = styled.h2`
  margin-top: 0;
`;

const BottomRow = styled.form`
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
`;

const Code = styled.input`
  height: 32px;
  font-size: 16px;
  padding: 4px 4px 4px 12px;
`;

const Name = styled(Code)`
  margin-bottom: 8px;
`;

export default Home;
