import express from 'express';
import path from 'path';

express().use(express.static(path.resolve(__dirname, 'public'))).listen(8888)
