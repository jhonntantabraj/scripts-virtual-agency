import 'reflect-metadata';
import Container from 'typedi';
import { Generator } from './generator/generator';

const generator = Container.get(Generator);
generator.generateQueries(10000, 110001, 120000);
/* 
  1. cantidad de scripts
  2. id de comienzo
  3. id de finalizacio
*/
// generator.generateQueries(50);
