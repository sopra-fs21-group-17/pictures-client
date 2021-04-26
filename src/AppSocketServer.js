// import { lobby } from './lobby';
// import express from 'express';
// import http from 'http';
// import { API_PORT, host } from './env';


const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

