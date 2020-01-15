import React, { useState, useEffect } from "react";

import api from "../../services/api";

import {
  Container,
  Aside,
  Main,
  InputBlock,
  InputGroup,
  DevLi,
  DevLiHeader
} from "./styles";

export default function Home() {
  const [devs, setDevs] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [github_username, setGithub_username] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post("/devs", {
      github_username,
      techs,
      latitude,
      longitude
    });

    setDevs([...devs, response.data]);
    setGithub_username("");
    setTechs("");
  }

  return (
    <Container>
      <Aside>
        <strong>Cadastrar</strong>
        <form action='' onSubmit={handleAddDev}>
          <InputBlock>
            <label htmlFor='username_github'>Usuário do Github</label>
            <input
              type='text'
              name='github_username'
              id='username_github'
              value={github_username}
              onChange={({ target }) => setGithub_username(target.value)}
              required
            />
          </InputBlock>
          <InputBlock>
            <label htmlFor='techs'>Tecnologias</label>
            <input
              type='text'
              name='techs'
              id='techs'
              value={techs}
              onChange={({ target }) => setTechs(target.value)}
              required
            />
          </InputBlock>
          <InputGroup>
            <InputBlock>
              <label htmlFor='latitude'>Latitude</label>
              <input
                type='number'
                name='latitude'
                id='latitude'
                value={latitude}
                required
                onChange={({ target }) => setLatitude(target.value)}
              />
            </InputBlock>
            <InputBlock>
              <label htmlFor='longitude'>Longitude</label>
              <input
                type='number'
                name='longitude'
                id='longitude'
                value={longitude}
                required
                onChange={({ target }) => setLongitude(target.value)}
              />
            </InputBlock>
          </InputGroup>
          <button type='submit'>Salvar</button>
        </form>
      </Aside>
      <Main>
        <ul>
          {devs.map(dev => (
            <DevLi key={dev._id}>
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <DevLiHeader>
                  <strong>{dev.name}</strong>
                  <span>{dev.techs.join(", ")}</span>
                </DevLiHeader>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.github_username}`}>
                Acessar perfil no Github
              </a>
            </DevLi>
          ))}
        </ul>
      </Main>
    </Container>
  );
}
