const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

//Simulando usuarios 

const usuarios = [
    {id:1,nome:"Thais", email:'thais@teste.com', senha:'123456'},
    {id:2,nome:"ok", email:'ok@teste.com', senha:'123'},
    {id:3,nome:"Hi", email:'hi@teste.com', senha:'1234'},
    {id:4,nome:"Ola", email:'ola@teste.com', senha:'12345'}
];

app.get('/login', (req, res)=> {
    res.sendFile(path.join(__dirname,'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { email, senha} = req.body;

    const usuario = usuarios.find(u=> u.email === email);

    if(!usuario || usuario.senha !==senha){
        return res.status(401).send('Credenciais inválidas');
    }

    res.redirect('/sucesso.html');
});

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/sucesso', (req, res)=> {
    res.sendFile(path.join(__dirname,'public', 'sucesso.html'));
});

app.post('/sucesso', (req,res) => {
    const {nome, email, senha} = req.body;

    if(usuarios.some(u => u.email === email)){
        return res.status(400).send('Este email já existe');
    }
    const id = usuarios.length+1;
    const novo = {id, nome, email,senha};

    usuarios.push(novo);
    res.redirect('/login.html');
});



