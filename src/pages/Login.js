import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Input from "../components/Input";
import Button from "../components/Button";

import UserContext from "../contexts/UserContext";

import logo from "../assets/images/logo-pokedex.png";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setToken } = useContext(UserContext);
    const history = useHistory();

    function submit(event) {
        event.preventDefault();

        axios.post(`https://back-end-pokedex.herokuapp.com/sign-in`, {
            email,
            password
        }).then(res => {
            setToken(res.data);
            history.push("/");
        });
    }

    return (
        <Page>
            <Container onSubmit={submit}>
                <img src={logo} alt="Logo" />
                <Input type="text" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <Button>Sign In</Button>
                <Link to="/sign-up" style={{ padding: '6px' }}>Don't have an account? Sign Up</Link>
            </Container>
        </Page>
    );
}

const Page = styled.div`
    min-height: 100vh;
    width: 100%;
    padding: 20px;
    background-color: #E44141;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Container = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
`;
